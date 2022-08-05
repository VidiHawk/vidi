const {sequelize} = require("../model/sequelize");
const SqlString = require('sqlstring');
const {blogPost: {SCHEMA: {FIELDS: POST_FIELDS, TABLE_NAME: POST_TABLE_NAME}}} = require("../model");
const {metadata: {SCHEMA: {FIELDS: METADATA_FIELDS, TABLE_NAME: METADATA_TABLE_NAME}}} = require("../model");
const moment = require('moment');

const blog_post = {};

const QUERY_BUILDER = {
  SAVE: (title, description, content, author_id, published, slug, meta_title) => {
    const data = {
      [POST_FIELDS.TITLE] : title,
      [POST_FIELDS.DESCRIPTION] : description,
      [POST_FIELDS.CONTENT] : content,
      [POST_FIELDS.AUTHOR_ID] : author_id,
      [POST_FIELDS.PUBLISHED] : published,
      [POST_FIELDS.META_TITLE] : meta_title,
      [POST_FIELDS.SLUG] : slug,
      [POST_FIELDS.PUBLISHED_AT]: published == 1 ? moment().format() : null
    }
    return SqlString.format(`INSERT INTO ${POST_TABLE_NAME} SET ?`, data)
  },
  FETCH: (slug) => {
    const query = `SELECT  p.${POST_FIELDS.ID}, p.${POST_FIELDS.TITLE}, p.${POST_FIELDS.DESCRIPTION}, 
    p.${POST_FIELDS.CONTENT},p.${POST_FIELDS.AUTHOR_ID}, 
    p.${POST_FIELDS.META_TITLE}, p.${POST_FIELDS.SLUG}, 
    p.${POST_FIELDS.IMG_SRC},
    p.${POST_FIELDS.PUBLISHED_AT}, cat.title as category,
    meta.${METADATA_FIELDS.TITLE} as metaTitle, meta.${METADATA_FIELDS.DESCRIPTION} as metaDescription, meta.${METADATA_FIELDS.KEYWORDS} as metaKeywords, meta.${METADATA_FIELDS.OG_IMAGE} as ogImage
    FROM ${POST_TABLE_NAME} as p
    LEFT JOIN post_category as pc ON pc.post_id = p.id
    LEFT JOIN category as cat ON cat.id = pc.category_id
    LEFT JOIN ${METADATA_TABLE_NAME} as meta ON meta.${METADATA_FIELDS.ENTITY_ID} = p.id AND meta.${METADATA_FIELDS.ENTITY_TYPE} = 'post'
    WHERE p.slug = ?`;

    return SqlString.format(query, [slug]);
  },
  GET_ALL: () => {
    const query = `SELECT p.${POST_FIELDS.ID}, p.${POST_FIELDS.TITLE}, p.${POST_FIELDS.DESCRIPTION}, p.${POST_FIELDS.CONTENT},
    p.${POST_FIELDS.AUTHOR_ID}, p.${POST_FIELDS.META_TITLE}, 
    p.${POST_FIELDS.SLUG}, p.${POST_FIELDS.IMG_SRC}, p.id, p.${POST_FIELDS.PUBLISHED_AT}, cat.title as category
    FROM ${POST_TABLE_NAME} as p
    LEFT JOIN post_category as pc ON pc.post_id = p.id
    LEFT JOIN category as cat ON pc.category_id = cat.id
    WHERE p.${POST_FIELDS.PUBLISHED} = 1
    AND p.${POST_FIELDS.PUBLISHED_AT} <= NOW()
    ORDER BY ${POST_FIELDS.PUBLISHED_AT} desc`;
    
    return SqlString.format(query,[]);
  }
}
blog_post.save = (title, description, content, author_id, published, slug, meta_title) => new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.SAVE(title, description, content, author_id, published, slug, meta_title), { type: sequelize.QueryTypes.INSERT}).then(result => resolve({result})).catch(error => resolve({error}));
  })

blog_post.get = (slug) => new Promise((resolve, reject) => {
    sequelize.query(QUERY_BUILDER.FETCH(slug), { type: sequelize.QueryTypes.SELECT}).then(result => {
      const formattedData =  result && result[0] ? blogWrapper(result) : [];
      resolve({result: formattedData && formattedData[0] ? formattedData[0] : {}})
    }).catch(error => resolve({error}));
  })

blog_post.getAll = () => new Promise((resolve, reject) => {
  sequelize.query(QUERY_BUILDER.GET_ALL(), { type: sequelize.QueryTypes.SELECT}).then(result => {
    const formattedData =  result && result[0] ? blogWrapper(result) : [];
    resolve({result: formattedData})
  }).catch(error => {
    resolve({error})
  });
})

const blogWrapper = (data) =>{
  return data.map(_obj => {
    return{
      id: _obj[POST_FIELDS.ID],
      title: _obj[POST_FIELDS.TITLE],
      description: _obj[POST_FIELDS.DESCRIPTION],
      content: _obj[POST_FIELDS.CONTENT],
      author_id: _obj[POST_FIELDS.AUTHOR_ID],
      published: _obj[POST_FIELDS.PUBLISHED],
      created_at: _obj[POST_FIELDS.CREATED_AT],
      updated_at: _obj[POST_FIELDS.UPDATED_AT],
      published_at: _obj[POST_FIELDS.PUBLISHED_AT],
      meta_title: _obj[POST_FIELDS.META_TITLE],
      slug: _obj[POST_FIELDS.SLUG],
      img_src: _obj[POST_FIELDS.IMG_SRC],
      metadata:{
        title: _obj.metaTitle,
        description: _obj.metaDescription,
        keywords: _obj.metaKeywords,
        ogImage: _obj.ogImage
      }
    }
  })
}

module.exports = blog_post;
