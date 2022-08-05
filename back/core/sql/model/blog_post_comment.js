/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "post_comment";
const FIELDS = {
  POST_ID: "post_id",
  CREATED_AT: "created_at",
  CONTENT: "content",
  USERNAME: "username",
  EMAIL: "email",
}

let post_comment = {};

post_comment.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = post_comment;