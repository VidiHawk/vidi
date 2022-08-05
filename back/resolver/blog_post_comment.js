const {blogPostComment: blogPostCommentSQL} = require("../core/sql/controller");

const BlogPostComment = {};

BlogPostComment.submit = async (parent, form) => {
    const { post_id, content, email, username} = form;
    const formResp = await blogPostCommentSQL.save(post_id, content, email, username);
    if(formResp.error) throw new Error(formResp.error);
    return { data : form, message:'Success' };
}

BlogPostComment.getComments = async (parent, params) => {
    const data = await blogPostCommentSQL.get(params.id);
    console.log(data);
    if(data.error) throw new Error(data.error);
    const commentData = data.result;
    return { data : [...commentData]};
}

module.exports = BlogPostComment;
