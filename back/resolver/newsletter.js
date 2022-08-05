const {newsletter: newsletterSQL} = require("./../core/sql/controller");
const {emailConfirmation: emailConfirmationRedis} = require("./../core/redis");
const notification= require("./../lib/notification");
const tokenHelper = require("../helper/tokenHelper");
const {emailService, sendgridService} = require("../services");

const Newsletter = {};

Newsletter.submit = async (parent, form) => {
  const {email, blog = false, url} = form;
  const checkIfAlreadySubscribed = await newsletterSQL.checkIfAlreadySubscribed(email);
  if(Array.isArray(checkIfAlreadySubscribed) && checkIfAlreadySubscribed.length) return {error: true, message: 'You are already signed up to the newsletter'} 
  const formResp = await newsletterSQL.save(email);
  if(formResp.error) throw new Error(formResp.error);
  
  const token = tokenHelper.generate(email, blog ? tokenHelper.NEWSLETTER_SOURCE.NEWSLETTER_BLOG_FORM : tokenHelper.NEWSLETTER_SOURCE.NEWSLETTER_FORM);
  await emailService.sendNewsletterConfirmationEmail(email, token);
  await emailConfirmationRedis.saveNewsletterConfirmationToken(email, token, url);
  return { data : form, message:'Success' };
}

Newsletter.verify = async (parent, form) => {
  const {token} = form;
  const [email, _token, source] = tokenHelper.decrypt(token).split(':');
  const correctToken = await emailConfirmationRedis.getNewsletterConfirmationToken(email);
  if(correctToken && correctToken.token === token){
    const formResp = await newsletterSQL.verifyEmail(email);
    emailConfirmationRedis.revokeNewsletterConfirmationToken(email);
    sendgridService.addContactToList([sendgridService.SENDGRID_CONTACT_LIST_IDS.NEWSLETTER], {
      email
    }, () => {})
    if(formResp.error) throw new Error(formResp.error);
  }else{
    console.log(`---Newsletter.verify()----`, 'token invalid or is expired\n', email,'\n', correctToken,'\n', token)
    return {error: true, message: 'Confirmation link is expired'}
  }
  
  notification.newsletter(email, source, correctToken.url);
  return { data : form, message:'Success' };
}

module.exports = Newsletter;