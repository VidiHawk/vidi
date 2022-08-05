const {contact: contactSQL, newsletter: newsletterSQL} = require("./../core/sql/controller");
const {contact: {SCHEMA: {FIELDS: CONTACT_SQL_FIELDS}}} = require("../core/sql/model");
const notification= require("./../lib/notification");
const tokenHelper = require("../helper/tokenHelper");
const stringHelper = require("../helper/stringHelper");
const {emailService, sendgridService} = require("../services");
const {emailConfirmation: emailConfirmationRedis} = require("./../core/redis");

const Contact = {};

Contact.submit = async (parent, form) => {
  const {name, email, company, website, message, newsletter = false, demo = false, url} = form;
  
  /*
  const _current = await contactSQL.checkIfAlreadySignedUp(email);

  if(Array.isArray(_current) && _current[0]){
    if(demo){
      const _currDemoStatus = _current[0][CONTACT_SQL_FIELDS.DEMO_REQUEST];
      if(_currDemoStatus == 1) return {error: true, message: 'You have already requested for the demo'} 
    }else{
      return {error: true, message: 'You have already registered on vidiren'} 
    }
  }
  */

  const formResp = await contactSQL.save(name, email, company, website, message, demo);
  const {firstName, lastName} = stringHelper.buildFirstLastName(name);
  sendgridService.addContactToList([sendgridService.SENDGRID_CONTACT_LIST_IDS.DEMO_CONTACT_REQUEST], {
    email,
    firstName, lastName 
  }, () => {})
  if(formResp.error) throw new Error(formResp.error);
  
  if(newsletter === true){
    const checkIfAlreadySubscribed = await newsletterSQL.checkIfAlreadySubscribed(email);
    if(Array.isArray(checkIfAlreadySubscribed) && checkIfAlreadySubscribed.length) return {error: true, message: 'You are already signed up to the newsletter'} 
    
    const formResp2 = await newsletterSQL.save(email);
    if(formResp2.error) throw new Error(formResp2.error);
    const token = tokenHelper.generate(email, demo ? tokenHelper.NEWSLETTER_SOURCE.DEMO_REQUEST_FORM: tokenHelper.NEWSLETTER_SOURCE.CONTACT_US_FORM);
    await emailService.sendNewsletterConfirmationEmail(email, token);
    await emailConfirmationRedis.saveNewsletterConfirmationToken(email, token, url);
  }
  
  await emailService.sendDemoRequestEmail(email);
  notification.contact(name, email, company, website, message);
  return { data : form, message:'Success' };
}

module.exports = Contact;