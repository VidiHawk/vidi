import { gql } from '@apollo/client'

interface StaticI {
  get: any
}
export const STATIC:StaticI = {
  get: ()=> {},
}

STATIC.get = () => {
  return gql`
    query StaticPage($page: String) {
      static(page: $page) {
        html
        label
        createdAt
        updatedAt
      }
    }
  `
}
