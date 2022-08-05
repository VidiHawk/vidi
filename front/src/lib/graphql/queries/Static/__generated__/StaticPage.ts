/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StaticPage
// ====================================================

export interface StaticPage_static {
  __typename: "StaticContent";
  html: string | null;
  label: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface StaticPage {
  static: StaticPage_static | null;
}

export interface StaticPageVariables {
  page?: string | null;
}
