/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "metadata";
const FIELDS = {
  ENTITY_ID: "entityId",
  ENTITY_TYPE: "entityType",
  TITLE: "title",
  DESCRIPTION: "description",
  KEYWORDS: "keywords",
  OG_IMAGE: "ogImage"
}

let contact = {};

contact.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = contact;