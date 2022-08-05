/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "newsletter";
const FIELDS = {
  EMAIL: "email",
  STATUS: 'status'
}

let newsletter = {};

newsletter.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = newsletter;