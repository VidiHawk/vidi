/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "contact_us";
const FIELDS = {
  EMAIL: "email",
  NAME: "name",
  COMPANY: "company",
  WEBSITE: "website",
  MESSAGE: "message",
  DEMO_REQUEST: "demo_request",
}

let contact = {};

contact.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = contact;