import { gql } from '@apollo/client'
import { CONTACT } from '../../../mutations/Contact'

interface BlogPostI {
  getPosts: any,
  getPost: any,
  getComments: any,
  save: any,
}

export const BLOG:BlogPostI = {
  getPosts: ()=>{},
  getPost: ()=>{},
  getComments: ()=>{},
  save: ()=> {},
}

BLOG.getPosts = () => {
  return gql`
    query getAllPosts {
      getAllPosts {
        data {
          id
          title
          content
          description
          slug
          meta_title
          img_src
          category
          published_at 
        }
      }
    }
  `
}


BLOG.getPost = () => {
  return gql`
    query getPost($slug: String) {
      getPost(slug: $slug) {
        data {
          id
          title
          content
          description
          slug
          meta_title
          category
          img_src
          published_at
          metadata{
            title
            description
            keywords
            ogImage
          }
          blogAuthorData {
            name
            description
            email
            avatar_url
            facebook_url
            linkedin_url
            youtube_url
            twitter_url
          }
        }
        }
    }
  `
}

BLOG.getComments = () => {
  return gql`
      query getComments($id: Int!) {
          getComments(id: $id) {
              data {
                  post_id
                  content
                  username
                  created_at
              }
          }
      }
  `
}

BLOG.save = () => {
  return gql`
      mutation addBlogPostComment(
      $post_id: ID!
      $content: String!
      $email: String!
      $username: String!
      ) {
          addBlogPostComment(
              post_id: $post_id
              email: $email
              content: $content
              username: $username
          ) {
              message
          }
      }
  `
}

