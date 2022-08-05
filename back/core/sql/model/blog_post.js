/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "post";
const FIELDS = {
  ID: "id",
  TITLE: "title",
  DESCRIPTION: "description",
  CONTENT: 'content',
  AUTHOR_ID: "author_id",
  PUBLISHED: "published",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
  PUBLISHED_AT: "published_at",
  META_TITLE: "meta_title",
  SLUG: "slug",
  IMG_SRC:"img_src"
}

let post = {};

post.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = post;