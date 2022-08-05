const {blogPost: blogPostSQL, blogAuthor: blogAuthorSQL} = require("../core/sql/controller");

const BlogPost = {};

BlogPost.getPost = async (parent, params) => {
  const data = await blogPostSQL.get(params.slug);
  if(data.error) throw new Error(data.error);
  const postData = data.result;
  const blogAuthorData = await blogAuthorSQL.get(+postData.author_id);
  return { data: {...postData, blogAuthorData: {...blogAuthorData.result}}};
}

BlogPost.submit = async (parent, form) => {
  const {title, description, content, slug, author_id, published, meta_title} = form;
  const formResp = await blogPostSQL.save(title, description, content, author_id, published, slug, meta_title);
  if(formResp.error) throw new Error(formResp.error);
  return { data : form, message:'Success' };
}

BlogPost.getAllPosts= async (parent, params) => {
  const data = await blogPostSQL.getAll();
  if(data.error) throw new Error(data.error);
  const postData = data.result;
  return {data: postData}
}

module.exports = BlogPost;
