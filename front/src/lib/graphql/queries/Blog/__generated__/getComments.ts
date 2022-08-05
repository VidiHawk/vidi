/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getComments
// ====================================================

export interface getComments_getComments_data {
  __typename: "PostCommentData";
  post_id: string;
  content: string;
  username: string | null;
  created_at: string | null;
}

export interface getComments_getComments {
  __typename: "PostComment";
  data: (getComments_getComments_data | null)[] | null;
}

export interface getComments {
  getComments: getComments_getComments | null;
}

export interface getCommentsVariables {
  id: number;
}
