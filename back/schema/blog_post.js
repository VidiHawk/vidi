const BlogPost = {};

BlogPost.types =  `
  type Metadata {
    title: String,
    description: String,
    keywords: String,
    ogImage: String
  }
  
  type BlogAuthorData {
    name: String,
    description: String,
    email: String,
    avatar_url: String,
    twitter_url: String,
    facebook_url: String,
    linkedin_url: String,
    youtube_url: String,
    
 }

  type BlogPostData {
    id: ID,
    title: String,
    description: String,
    content: String,
    slug: String,
    author_id: String, 
    published: Boolean,
    meta_title: String,
    category: String,
    img_src: String,
    metadata: Metadata,
    blogAuthorData: BlogAuthorData,
    published_at: String
  }

  type BlogPostDataSuccessResponse {
    message: String!,
    data: BlogPostData
  }

  type BlogPost {
    data: BlogPostData
  }

  type BlogPosts {
    data: [BlogPostData]
  }

  
`;


module.exports = BlogPost;
