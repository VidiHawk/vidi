import { gql } from '@apollo/client'

interface NewsletterI {
  save: any
  verifyToken: any
}
export const NEWSLETTER:NewsletterI = {
  save: ()=> {},
  verifyToken: ()=> {},
}

NEWSLETTER.save = () => {
  return gql`
    mutation submitNewsletter($email: String!, $blog: Boolean, $url: String!) {
      newsletterForm(email: $email, blog: $blog, url: $url) {
        message
      }
    }
  `
}

NEWSLETTER.verifyToken = () => {
  return gql`
      mutation newsletterFormVerify(
          $token: String
      ) {
          newsletterFormVerify(
              token: $token
          ) {
              message,
              error
          }
      }
  `
}
