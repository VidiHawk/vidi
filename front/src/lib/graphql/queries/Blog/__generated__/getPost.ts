/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPost
// ====================================================

export interface getPost_getPost_data_metadata {
  __typename: "Metadata";
  title: string | null;
  description: string | null;
  keywords: string | null;
  ogImage: string | null;
}

export interface getPost_getPost_data_blogAuthorData {
  __typename: "BlogAuthorData";
  name: string | null;
  description: string | null;
  email: string | null;
  avatar_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;
}

export interface getPost_getPost_data {
  __typename: "BlogPostData";
  id: string | null;
  title: string | null;
  content: string | null;
  description: string | null;
  slug: string | null;
  meta_title: string | null;
  category: string | null;
  img_src: string | null;
  published_at: string | null;
  metadata: getPost_getPost_data_metadata | null;
  blogAuthorData: getPost_getPost_data_blogAuthorData | null;
}

export interface getPost_getPost {
  __typename: "BlogPost";
  data: getPost_getPost_data | null;
}

export interface getPost {
  getPost: getPost_getPost | null;
}

export interface getPostVariables {
  slug?: string | null;
}
