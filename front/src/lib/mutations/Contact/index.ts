import { gql } from '@apollo/client'


interface ContactI {
  save: any
}
export const CONTACT:ContactI = {
  save: ()=> {},
}

CONTACT.save = () => {
  return gql`
    mutation submitContact(
      $name: String!
      $email: String
      $website: String
      $company: String
      $message: String
      $newsletter: Boolean
      $demo: Boolean
      $url: String!
    ) {
      contactForm(
        name: $name
        email: $email
        website: $website
        company: $company
        message: $message
        newsletter: $newsletter
        demo: $demo
        url: $url
      ) {
        message
      }
    }
  `
}
