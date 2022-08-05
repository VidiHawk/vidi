const requestHelper = require('../helper/requestHelper');
const config = require("../config/index").getConfig();

const sendgridService = {};

const SENDGRID_CONTACT_LIST_IDS = {
  DEMO_CONTACT_REQUEST: "80948dd6-319b-496e-a835-c6f3b5af3786",
  NEWSLETTER: "20dd904d-3305-44a1-95e6-6649813f521d"
}

sendgridService.SENDGRID_CONTACT_LIST_IDS = SENDGRID_CONTACT_LIST_IDS;

/**
* creating contact list
* @param {*} listName 
* @param {*} callback 
*/
sendgridService.createContactList = (listName, callback) => {
  if(!listName) return callback('listname is mandatory', null);
  
  requestHelper.POST({
    body: {
      name: listName
    },
    headers: {
      authorization: `Bearer ${config.SENDGRID_API_KEY}`
    },
    url: "https://api.sendgrid.com/v3/marketing/lists",
  }, callback);
}

sendgridService.addContactToList = (listIds = [], contact = {}, callback) => {
  if(!listIds.length || !Object.keys(contact).length) return callback('listIds/contact is mandatory', null);
  
  requestHelper.PUT({
    body: {
      "list_ids": listIds,
      "contacts": [
        {
          "email": contact.email,
          "first_name": contact.firstName,
          "last_name": contact.lastName,
        }
      ]
    },
    headers: {
      authorization: `Bearer ${config.SENDGRID_API_KEY}`
    },
    url: "https://api.sendgrid.com/v3/marketing/contacts",
  }, callback);
}

module.exports = sendgridService;