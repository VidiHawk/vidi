const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {newsletter: {SCHEMA: {FIELDS: NEWSLETTER_FIELDS, TABLE_NAME: NEWSLETTER_TABLE_NAME}}} = require("../model");

let newsletter = {};

/**
* saving newsletter time in DB
* @param {*} callback
*/
newsletter.save = (email) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(email), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

newsletter.verifyEmail = async(email) => {
  return await sequelize.query(QUERY_BUILDER.VERIFIED(email), {type: sequelize.QueryTypes.UPDATE});
}

newsletter.checkIfAlreadySubscribed = async(email) => {
  return await sequelize.query(QUERY_BUILDER.CHECK_IF_ALREADY_SIGNED_UP_FOR_NEWSLETTER(email), {type: sequelize.QueryTypes.SELECT});
}

module.exports = newsletter;

const QUERY_BUILDER = {
  SAVE: (email) => {
    const QUERY = `INSERT INTO  ${NEWSLETTER_TABLE_NAME} (${NEWSLETTER_FIELDS.EMAIL}) VALUES (?) ON DUPLICATE KEY UPDATE ${NEWSLETTER_FIELDS.EMAIL} = ?`;
    return SqlString.format(QUERY, [email, email]);
  },

  VERIFIED: (email) => {
    const QUERY = `UPDATE ${NEWSLETTER_TABLE_NAME}
    SET ${NEWSLETTER_FIELDS.STATUS} = 1
    WHERE ${NEWSLETTER_FIELDS.EMAIL} = ?`;
    return SqlString.format(QUERY, [email]);
  },

  CHECK_IF_ALREADY_SIGNED_UP_FOR_NEWSLETTER: (email) => {
    const QUERY = `SELECT id
    FROM ${NEWSLETTER_TABLE_NAME}
    WHERE ${NEWSLETTER_FIELDS.EMAIL} = ? 
    AND ${NEWSLETTER_FIELDS.STATUS} = 1`;
    return SqlString.format(QUERY, [email]);
  }
}