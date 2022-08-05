const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogPostComment: {SCHEMA: {FIELDS: POST_COMMENT_META_FIELDS, TABLE_NAME: POST_COMMENT_META_TABLE_NAME}}} = require("../model");

let blog_post_comment= {};

/**
* saving blog post comment entry in DB
* @param {*} callback
*/
blog_post_comment.save = (post_id, content, email, username) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(post_id, content, email, username), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}

blog_post_comment.get = (id) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.FETCH(id), { type: sequelize.QueryTypes.SELECT}).then(result => {
      return resolve({result: commentWrapper(result) });
    }).catch(error => resolve({error}));
  })
}

module.exports = blog_post_comment;

const QUERY_BUILDER = {
  SAVE: (post_id, content, email, username) => {
    const data = {
      [POST_COMMENT_META_FIELDS.POST_ID] : post_id,
      [POST_COMMENT_META_FIELDS.CONTENT] : content,
      [POST_COMMENT_META_FIELDS.EMAIL] : email,
      [POST_COMMENT_META_FIELDS.USERNAME] : username,
    }
    return SqlString.format(`INSERT INTO ${POST_COMMENT_META_TABLE_NAME} SET ?`, data)
  },
  FETCH: (id) => {
    const query = `SELECT 
     ${POST_COMMENT_META_FIELDS.POST_ID},
     ${POST_COMMENT_META_FIELDS.CONTENT},
     ${POST_COMMENT_META_FIELDS.USERNAME}, 
     ${POST_COMMENT_META_FIELDS.EMAIL},
     ${POST_COMMENT_META_FIELDS.CREATED_AT}
      FROM ${POST_COMMENT_META_TABLE_NAME} WHERE ${POST_COMMENT_META_FIELDS.POST_ID} = ?`;
    return SqlString.format(query, [id]);
  }
}

const commentWrapper = (data) =>{
  return data.map(_obj => {
    return{
      post_id: _obj[POST_COMMENT_META_FIELDS.POST_ID],
      content: _obj[POST_COMMENT_META_FIELDS.CONTENT],
      email: _obj[POST_COMMENT_META_FIELDS.EMAIL],
      username: _obj[POST_COMMENT_META_FIELDS.USERNAME],
      created_at: _obj[POST_COMMENT_META_FIELDS.CREATED_AT],
    }
  })
}
