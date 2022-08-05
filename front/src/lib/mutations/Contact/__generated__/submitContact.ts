/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitContact
// ====================================================

export interface submitContact_contactForm {
  __typename: "ContactSuccessResponse";
  message: string;
}

export interface submitContact {
  contactForm: submitContact_contactForm | null;
}

export interface submitContactVariables {
  name: string;
  email?: string | null;
  website?: string | null;
  company?: string | null;
  message?: string | null;
  newsletter?: boolean | null;
}
