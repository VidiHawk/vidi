/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "static";
const FIELDS = {
  PAGE: "page",
  CONTENT: "content",
  LABEL: "label",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at"
}

let static = {};

static.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = static;