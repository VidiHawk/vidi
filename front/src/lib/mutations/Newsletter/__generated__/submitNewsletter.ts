/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: submitNewsletter
// ====================================================

export interface submitNewsletter_newsletterForm {
  __typename: "NewsletterSuccessResponse";
  message: string;
}

export interface submitNewsletter {
  newsletterForm: submitNewsletter_newsletterForm | null;
}

export interface submitNewsletterVariables {
  email: string;
}
