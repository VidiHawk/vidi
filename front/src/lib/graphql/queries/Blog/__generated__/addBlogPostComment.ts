/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addBlogPostComment
// ====================================================

export interface addBlogPostComment_addBlogPostComment {
  __typename: "BlogCommentDataSuccessResponse";
  message: string;
}

export interface addBlogPostComment {
  addBlogPostComment: addBlogPostComment_addBlogPostComment | null;
}

export interface addBlogPostCommentVariables {
  post_id: string;
  content: string;
  email: string;
  username: string;
}
