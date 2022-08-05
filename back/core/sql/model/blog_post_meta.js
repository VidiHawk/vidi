/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "post_meta";
const FIELDS = {
  POST_ID: "post_id",
  KEY: 'key',
  CONTENT: "content"
}

let post_meta = {};

post_meta.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = post_meta;