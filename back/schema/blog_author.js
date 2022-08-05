const Author = {};

Author.types = `
type AuthorDataSuccessResponse {
  message: String!,
  data: AuthorData
}

type AuthorData {
  name: String,
  description: String,
  avatar_url: String,
  email: String
  youtube_url: String,
  linkedin_url: String,
  twitter_url: String,
  facebook_url: String,
}

type Author {
    data: AuthorData
}
`

module.exports = Author;