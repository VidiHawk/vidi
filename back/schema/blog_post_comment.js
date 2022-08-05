const BlogComment = {};

BlogComment.types = `
type BlogCommentDataSuccessResponse {
  message: String!,
  data: BlogCommentData
}

type BlogCommentData {
  post_id: ID!,
  content: String!,
  email: String!,
  username: String!
}

type BlogComment {
    data: BlogCommentData
}

type PostCommentData {
    content: String!,
    post_id: ID!,
    email: String,
    username: String,
    created_at: String,
}

type PostComment {
    data: [PostCommentData]
}
`

module.exports = BlogComment;
