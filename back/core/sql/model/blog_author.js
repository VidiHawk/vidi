/**
* Module specific to stores_pdp_info table
*/

const TABLE_NAME = "author";
const FIELDS = {
  ID: "id",
  NAME: "name",
  DESCRIPTION: "description",
  AVATAR_URL: 'avatar_url',
  EMAIL: 'email',
  FACEBOOK_URL: 'facebook_url',
  TWITTER_URL: 'twitter_url',
  LINKEDIN_URL: 'linkedin_url',
  YOUTUBE_URL: 'youtube_url'
}

let author = {};

author.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = author;