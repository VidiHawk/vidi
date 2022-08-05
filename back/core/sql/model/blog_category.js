/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "category";
const FIELDS = {
  PARENT_ID: "parent_id",
  TITLE: "title",
  META_TITLE: 'meta_title',
  SLUG: 'slug',
  DESCRIPTION: 'description',
}

let category = {};

category.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = category;