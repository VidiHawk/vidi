const rediskeys = require("./keys");
const redisQuery = require("./query");

const emailConfirmation = {};

const EXPIRY = 1*24*60*60;

/**
* saving newsletter confirmation email token
* @param {*} email 
* @param {*} token 
*/
emailConfirmation.saveNewsletterConfirmationToken = async (email, token, url) => {
  if(!token || !url) return;
  const _key = rediskeys.NEWSLETTER_EMAIL_CONFIRMATION_TOKEN(email);
  await redisQuery.asyncHmset(_key, {
    token,
    url
  });
  redisQuery.expire(_key, EXPIRY);
  return;
}

/**
* fetching newsletter confirmation email token
* @param {*} email 
*/
emailConfirmation.getNewsletterConfirmationToken = async (email) => {
  const _key = rediskeys.NEWSLETTER_EMAIL_CONFIRMATION_TOKEN(email);
  return await redisQuery.asyncHgetall(_key);
}

/**
* revoking newsletter confirmation email token
* @param {*} email 
*/
emailConfirmation.revokeNewsletterConfirmationToken = async (email) => {
  const _key = rediskeys.NEWSLETTER_EMAIL_CONFIRMATION_TOKEN(email);
  redisQuery.del(_key, (error, result) => {
    return Promise.resolve();
  });
}

module.exports = emailConfirmation;