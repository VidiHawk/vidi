/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPosts
// ====================================================

export interface getAllPosts_getAllPosts_data {
  __typename: "BlogPostData";
  id: string | null;
  title: string | null;
  content: string | null;
  description: string | null;
  slug: string | null;
  meta_title: string | null;
  img_src: string | null;
  category: string | null;
  published_at: string | null;
}

export interface getAllPosts_getAllPosts {
  __typename: "BlogPosts";
  data: (getAllPosts_getAllPosts_data | null)[] | null;
}

export interface getAllPosts {
  getAllPosts: getAllPosts_getAllPosts | null;
}
