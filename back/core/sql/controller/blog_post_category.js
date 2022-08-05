const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogPostCategory: {SCHEMA: {FIELDS: POST_CATEGORY_META_FIELDS, TABLE_NAME: POST_CATEGORY_META_TABLE_NAME}}} = require("../model");

let blog_post_category= {};

/**
* saving blog post category entry in DB
* @param {*} callback
*/
blog_post_category.save = (post_id, category_id) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(post_id, category_id), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

module.exports = blog_post_category;

const QUERY_BUILDER = {
  SAVE: (post_id, category_id) => {
    const data = {
      [POST_CATEGORY_META_FIELDS.POST_ID] : post_id,
      [POST_CATEGORY_META_FIELDS.CATEGORY_ID] : category_id,
    }
    return SqlString.format(`INSERT INTO ${POST_CATEGORY_META_TABLE_NAME} SET ?`, data)
  }
}