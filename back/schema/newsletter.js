const Newsletter = {};

Newsletter.submit = `
    type NewsletterSuccessResponse {
      message: String!,
      data: NewsletterData,
      error: Boolean
    }

    type NewsletterData {
      email: String,
      blog: Boolean,
      url: String!
    }
  `;

module.exports = Newsletter;