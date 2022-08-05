const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {static: {SCHEMA: {FIELDS: STATIC_FIELDS, TABLE_NAME: STATIC_TABLE_NAME}}} = require("../model");

let static = {};

/**
* saving contact entry in DB
* @param {*} callback
*/
static.get = (page) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.FETCH(page), { type: sequelize.QueryTypes.SELECT}).then(result => {
      return resolve({result: result && result[0] ? result[0] : {}});
    }).catch(error => resolve({error}));
  })
}

module.exports = static;

const QUERY_BUILDER = {
  FETCH: (page) => {
    const query = `SELECT ${STATIC_FIELDS.CONTENT}, ${STATIC_FIELDS.LABEL}, ${STATIC_FIELDS.CREATED_AT} as createdAt, ${STATIC_FIELDS.UPDATED_AT} as updatedAt FROM ${STATIC_TABLE_NAME} WHERE ${STATIC_FIELDS.PAGE} = ?`;
    return SqlString.format(query, [page]);
  }
}