const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogCategory: {SCHEMA: {FIELDS: CATEGORY_FIELDS, TABLE_NAME: CATEGORY_TABLE_NAME}}} = require("../model");

let blog_category = {};

/**
* saving blog author entry in DB
* @param {*} callback
*/
blog_category.save = (parent_id, title, meta_title, slug, description) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(parent_id, title, meta_title, slug, description), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

module.exports = blog_category;

const QUERY_BUILDER = {
  SAVE: (parent_id, title, meta_title, slug, description) => {
    const data = {
      [CATEGORY_FIELDS.PARENT_ID] : parent_id,
      [CATEGORY_FIELDS.TITLE] : title,
      [CATEGORY_FIELDS.META_TITLE] : meta_title,
      [CATEGORY_FIELDS.SLUG] : slug,
      [CATEGORY_FIELDS.DESCRIPTION] : description,
    }
    return SqlString.format(`INSERT INTO ${CATEGORY_TABLE_NAME} SET ?`, data)
  }
}