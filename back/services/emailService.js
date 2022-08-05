const config = require("../config/index").getConfig();

const sendgridmail = require("@sendgrid/mail");
sendgridmail.setApiKey(config.SENDGRID_API_KEY);

const TEMPLATES = {
  NEWSLETTER_EMAIL_CONFIRMATION: "d-db9903acc18f4bc0be91fad92da891e0",
  DEMO_REQUEST: "d-127f649667f84cd3a0c1dc7d163967de"
}

const emailService = {};

emailService.sendNewsletterConfirmationEmail = async(email, token) => {
  const confirmation_url = `${config["WEBSITE_HOST_URL"]}/newsletter-confirmation/${token}`;
  const msg = {
    from: 'info@vidiren.com', // Sender address
    to: email,
    templateId: TEMPLATES.NEWSLETTER_EMAIL_CONFIRMATION,
    dynamic_template_data: {
      confirmation_url
    }
  }
  sendgridmail
  .send(msg)
  .then(result => {
    console.log("----rrrr---", result);
    return Promise.resolve(result);
  }).catch(e => {
    console.log("----e---", e);
    return Promise.reject(e);
  });
}

emailService.sendDemoRequestEmail = async(email) => {
  const msg = {
    from: 'info@vidiren.com', // Sender address
    to: email,
    templateId: TEMPLATES.DEMO_REQUEST
  }
  sendgridmail
  .send(msg)
  .then(result => {
    console.log("----rrrr---", result);
    return Promise.resolve(result);
  }).catch(e => {
    console.log("----e---", e);
    return Promise.reject(e);
  });
}

module.exports = emailService;
