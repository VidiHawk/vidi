const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {contact: {SCHEMA: {FIELDS: CONTACT_FIELDS, TABLE_NAME: CONTACT_TABLE_NAME}}} = require("../model");

let contact = {};

/**
* saving contact entry in DB
* @param {*} callback
*/
contact.save = (name, email, company, website, message, demo) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(name, email, company, website, message, demo), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

/**
* 
* @param {*} email 
*/
contact.checkIfAlreadySignedUp = async(email) => {
  return await sequelize.query(QUERY_BUILDER.CHECK_IF_ALREADY_SIGNED_UP(email), {type: sequelize.QueryTypes.SELECT});
}

module.exports = contact;

const QUERY_BUILDER = {
  SAVE: (name, email, company, website, message, demo) => {
    const query = `INSERT INTO ${CONTACT_TABLE_NAME} (${CONTACT_FIELDS.EMAIL}, ${CONTACT_FIELDS.NAME}, ${CONTACT_FIELDS.WEBSITE}, ${CONTACT_FIELDS.COMPANY}, ${CONTACT_FIELDS.MESSAGE}, ${CONTACT_FIELDS.DEMO_REQUEST})
    VALUES (?,?,?,?,?,?)
    ON DUPLICATE KEY
    UPDATE 
    ${CONTACT_FIELDS.EMAIL} = ?,
    ${CONTACT_FIELDS.NAME} = ?,
    ${CONTACT_FIELDS.WEBSITE} = ?,
    ${CONTACT_FIELDS.COMPANY} = ?,
    ${CONTACT_FIELDS.MESSAGE} = ?,
    ${CONTACT_FIELDS.DEMO_REQUEST} = ?`;
    demo = demo ? 1 : 0;
    return SqlString.format(query, [email, name, website, company, message, demo, email, name, website, company, message, demo])
  },
  
  CHECK_IF_ALREADY_SIGNED_UP: (email) => {
    const QUERY = `SELECT *
    FROM ${CONTACT_TABLE_NAME}
    WHERE ${CONTACT_FIELDS.EMAIL} = ?`;
    return SqlString.format(QUERY, [email]);
  }
}