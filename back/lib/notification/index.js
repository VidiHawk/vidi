
const sgMail = require('@sendgrid/mail');
const config = require("../../config").getConfig();
sgMail.setApiKey(config.SENDGRID_API_KEY);

//Sending email notification to info@vidiren.com once got a message on vidiren site

const Notification = {};

Notification.contact = async (name, email, company = '', website = '',message = '')=>{
  const msg = {
    from: 'info@vidiren.com', // Sender address
    to: 'info@vidiren.com',         // List of recipients
    subject: 'Message from Vidiren', // Subject line
    html: `<div style="padding: 12px;">
    <p>You got a message from <strong>${name}</strong> (${email})</p>
    <p>Body: ${message}</p>
    <p>Company: ${company}</p>
    <p>Website: ${website}</p>
    </div>`
  }
  
  sgMail
  .send(msg)
  .then(result => {
    return Promise.resolve(result);
  }).catch(e => {
    return Promise.reject(e);
  });
}

Notification.newsletter = async (email, source = '', url = '')=>{
  const msg = {
    from: 'info@vidiren.com', // Sender address
    to: 'info@vidiren.com',         // List of recipients
    subject: 'Subscription on Vidiren', // Subject line
    html: `<div style="padding: 12px;">
    <p><strong>${email}</strong> has subscribed to the newsletter</p>
    <p>Source: ${source}</p>
    <p>Url: ${url}</p>
    </div>`
  }
  
  sgMail
  .send(msg)
  .then(result => {
    return Promise.resolve(result);
  }).catch(e => {
    return Promise.reject(e);
  });
}
module.exports = Notification