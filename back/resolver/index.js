const { submit:contactForm } = require("./contact");
const { submit:newsletterForm } = require("./newsletter");
const { verify:newsletterFormVerify } = require("./newsletter");
const { static } = require("./static");
const { getAllPosts,getPost, submit: blogPostData } = require("./blog_post");
const { submit: addNewAuthor, getAuthor } = require("./blog_author");
const {submit: addBlogPostComment, getComments} = require("./blog_post_comment");
const resolvers = {
  Query: {
    static,
    getPost,
    getAllPosts,
    getAuthor,
    getComments,
  },

  Mutation: {
    contactForm,
    newsletterForm,
    newsletterFormVerify,
    blogPostData,
    addNewAuthor,
    addBlogPostComment
  },
};

module.exports = resolvers;
