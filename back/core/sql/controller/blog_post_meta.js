const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogPostMeta: {SCHEMA: {FIELDS: POST_META_FIELDS, TABLE_NAME: POST_META_TABLE_NAME}}} = require("../model");

let blog_post_meta= {};

/**
* saving blog post meta entry in DB
* @param {*} callback
*/
blog_post_meta.save = (post_id, key, content) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(post_id, key, content), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

module.exports = blog_post_meta;

const QUERY_BUILDER = {
  SAVE: (post_id, key, content) => {
    const data = {
      [POST_META_FIELDS.POST_ID] : post_id,
      [POST_META_FIELDS.KEY] : key,
      [POST_META_FIELDS.CONTENT] : content,
    }
    return SqlString.format(`INSERT INTO ${POST_META_TABLE_NAME} SET ?`, data)
  }
}