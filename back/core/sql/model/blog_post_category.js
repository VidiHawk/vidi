/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "post_category";
const FIELDS = {
  POST_ID: "post_id",
  CATEGORY_ID: "category_id"
}

let post_category = {};

post_category.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = post_category;