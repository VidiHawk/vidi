const { gql } = require('apollo-server-express');
const {submit: contactSchema} = require('./contact');
const {submit: newsletterSchema} = require('./newsletter');
const { static: staticSchema} = require('./static');
const { types: blogPostSchema} = require('./blog_post');
const { types: authorSchema } = require('./blog_author');
const { types: blogPostComment} = require('./blog_post_comment');

const typeDefs = gql`
  ${contactSchema}
  ${newsletterSchema}
  ${staticSchema}
  ${blogPostSchema}
  ${authorSchema}
  ${blogPostComment}

  type Query {
    static(page: String): StaticContent,
    getPost(slug: String): BlogPost,
    getAllPosts: BlogPosts,
    getAuthor(id: Int!): AuthorData,
    getComments(id: Int!): PostComment
  }

  type Mutation {
    contactForm(name: String!, email: String, company: String, website: String, message: String, newsletter: Boolean, demo: Boolean, url: String!): ContactSuccessResponse,
    newsletterForm(email: String, blog: Boolean, url: String!): NewsletterSuccessResponse,
    newsletterFormVerify(email: String, token: String): NewsletterSuccessResponse,
    blogPostData(title: String, description: String, content: String, author_id: String, published: Boolean, slug: String, meta_title: String): BlogPostDataSuccessResponse
    addNewAuthor(name: String, description: String, avatar_url: String, email: String, youtube_url: String, linkedin_url: String, twitter_url: String, facebook_url: String):AuthorDataSuccessResponse,
    addBlogPostComment(post_id: ID!, content: String!, email: String!, username: String!): BlogCommentDataSuccessResponse,
  }
`;

module.exports = typeDefs;
