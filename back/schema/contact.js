const Contact = {};

Contact.submit = `
type ContactSuccessResponse {
  message: String!,
  data: ContactData,
  error: Boolean
}

type ContactData {
  name: String!, 
  email: String, 
  company: String, 
  website: String, 
  message: String,
  newsletter: Boolean,
  demo: Boolean,
  url: String!
}
  `


module.exports = Contact;