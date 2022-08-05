let randToken = require("rand-token");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('vidiren-secret-key');

const tokenHelper = {};

tokenHelper.NEWSLETTER_SOURCE = {
  NEWSLETTER_FORM: "Newsletter form",
  NEWSLETTER_BLOG_FORM: "Blog form",
  DEMO_REQUEST_FORM: "Demo Request form",
  CONTACT_US_FORM: "Contact form"
}

tokenHelper.generate = (email, source) => {
  const token = randToken.generate(64);
  return cryptr.encrypt(`${email}:${token}:${source}`);
}

tokenHelper.decrypt = (token) => {
  return cryptr.decrypt(token);
}

module.exports = tokenHelper;