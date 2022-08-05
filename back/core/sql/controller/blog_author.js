const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogAuthor: {SCHEMA: {FIELDS: AUTHOR_FIELDS, TABLE_NAME: AUTHOR_TABLE_NAME}}} = require("../model");

let blog_author = {};

/**
* saving blog author entry in DB
* @param {*} callback
*/
blog_author.save = (name, description, avatar_url, email, youtube_url, linkedin_url, twitter_url, facebook_url) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(name, description, avatar_url, email, youtube_url, linkedin_url, twitter_url, facebook_url), { type: sequelize.QueryTypes.INSERT}).then(result => {
      return resolve({result});
    }).catch(error => resolve({error}));
  })
}


blog_author.get = (id) => {
  return new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.FETCH(id), { type: sequelize.QueryTypes.SELECT}).then(result => {
      return resolve({result: result && result[0] ? result[0] : {}});
    }).catch(error => resolve({error}));
  })
}

module.exports = blog_author;

const QUERY_BUILDER = {
  SAVE: (name, description, avatar_url, email, youtube_url, linkedin_url, twitter_url, facebook_url) => {
    const data = {
      [AUTHOR_FIELDS.NAME] : name,
      [AUTHOR_FIELDS.DESCRIPTION] : description,
      [AUTHOR_FIELDS.AVATAR_URL] : avatar_url,
      [AUTHOR_FIELDS.EMAIL] : email,
      [AUTHOR_FIELDS.FACEBOOK_URL]: facebook_url,
      [AUTHOR_FIELDS.TWITTER_URL]: twitter_url,
      [AUTHOR_FIELDS.LINKEDIN_URL]: linkedin_url,
      [AUTHOR_FIELDS.YOUTUBE_URL]: youtube_url

    }
    return SqlString.format(`INSERT INTO ${AUTHOR_TABLE_NAME} SET ?`, data)
  },
  FETCH: (id) => {
    const query = `SELECT 
     ${AUTHOR_FIELDS.NAME},
     ${AUTHOR_FIELDS.DESCRIPTION},
     ${AUTHOR_FIELDS.AVATAR_URL}, 
     ${AUTHOR_FIELDS.EMAIL},
     ${AUTHOR_FIELDS.FACEBOOK_URL},
     ${AUTHOR_FIELDS.TWITTER_URL},
     ${AUTHOR_FIELDS.LINKEDIN_URL},
     ${AUTHOR_FIELDS.YOUTUBE_URL}
      FROM ${AUTHOR_TABLE_NAME} WHERE ${AUTHOR_FIELDS.ID} = ?`;
    return SqlString.format(query, [id]);
  }
}
