import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Input, Card, Form } from 'antd'

import AuthContext from '../../helpers/authContext'

import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { BLOG } from '../../lib/graphql/queries'
import {
  getPost, getPostVariables, getPost_getPost_data,
} from '../../lib/graphql/queries/Blog/__generated__/getPost'
import {
  getAllPosts, getAllPosts_getAllPosts_data,
} from '../../lib/graphql/queries/Blog/__generated__/getAllPosts'

import {
	TopBg,
	SearchIconSvg,
	BlogItemBottomSvg,
	BlogItemBottomMobileSvg,
	FacebookSvg,
	LinkedinSvg, YoutubeSvg, TwitterSvg, AvatarSvg,
} from '../../assets/svg'
import { Bethefirst, Loading } from '../../Components/Layout'
import Head from '../../Components/Head'
import VCheckbox from '../../Components/Common/VCheckbox'
import VButton from '../../Components/Common/VButton'
import TextArea from 'antd/es/input/TextArea'
import moment from 'moment'
import { NEWSLETTER } from '../../lib/mutations/Newsletter'
import { CSSTransition } from 'react-transition-group'

interface PostI {
  post: getPost_getPost_data
}

interface PostContainerI {
  post: getPost_getPost_data,
  themeDark: boolean
}

interface PopularPostsI {
  popularItems: getAllPosts_getAllPosts_data[],
  themeDark: boolean
}

interface SidebarI {
  popularItems: getAllPosts_getAllPosts_data[],
  svgIconsColor: String,
  themeDark: boolean
}
interface MainContainerI {
  post: getPost_getPost_data,
  svgIconsColor: String,
  popularItems: getAllPosts_getAllPosts_data[],
  themeDark: boolean
}

interface HeaderI {
  post: getPost_getPost_data,
  svgIconsColor: String,
  popularItems: getAllPosts_getAllPosts_data[]
}

const BlogItem = (props: any) => {
  const slug = props.match.params.slug
  const context = useContext(AuthContext)
  const themeDark = context.themeDark

  const svgBgColor = themeDark ? '#060606' : '#F0F1F6'
  const svgIconsColor = themeDark ? '#FFFFFF' : '#060606'

  const { data: blogDataItem, loading } = useQuery<getPost, getPostVariables>(BLOG.getPost(), {
    variables: {
      slug: slug,
    },
  })

  const blogPost = blogDataItem ? blogDataItem.getPost : null
  const blogData = blogPost ? blogPost.data : null

  const { data: blogListData } = useQuery<getAllPosts>(BLOG.getPosts())
  const blogList = blogListData ? blogListData.getAllPosts : null
  const popularItems = blogList ? blogList.data : null

  const onSearch = () => {
  }
  const metaData = blogData && blogData.metadata ? blogData.metadata : {}

  const [addComment,setAddComment] = useState<boolean>(false);

  if (loading) return (<Loading />)
  return (
	<>
		{blogData && <Head {...metaData} url={`https://vidicommerce.com/blog/${slug}`} />}
		<div className="v-blog v-blog-item">
			<Header {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor} post={blogData} />
			{blogData && <HeroItem post={blogData} />}
			<MainContainer {...props} post={blogData} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor}
				onSearch={onSearch} popularItems={popularItems} themeDark={themeDark} />
		</div>
		{blogDataItem && blogDataItem.getPost && blogDataItem.getPost.data && blogDataItem.getPost.data.blogAuthorData  && blogDataItem.getPost.data.blogAuthorData.name &&
			<AuthorSection themeDark={themeDark} authorData={blogDataItem.getPost.data.blogAuthorData }/>}
		<CommentListSection commentStatus={addComment} onComment={setAddComment} themeDark={themeDark} postId={blogDataItem && blogDataItem.getPost && blogDataItem.getPost.data && blogDataItem.getPost.data.id} />
		<CommentForm  onComment={setAddComment} postId={blogDataItem && blogDataItem.getPost && blogDataItem.getPost.data && blogDataItem.getPost.data.id}  />
		<BlogItemBottomSvg className="custom-blog-item-svg black-svg" />
		<BlogItemBottomMobileSvg className="blog-item-mobile-svg black-svg" />
		<NewsLetter/>
	</>
  )
}

const Header = (props: HeaderI) => {
  return (
	<section className="v-hero-post">
		<TopBg className="v-svgBg black-svg" />
		<Row justify="center">
			<Col span={18}>
				<div className="v-header">
					<div className="v-heading">
						<p className="v-heading__sub-title">{props.post && props.post.category}</p>
						<h1 className="v-heading__title">{props.post && props.post.title}</h1>
					</div>
				</div>
			</Col>
		</Row>
	</section>
  )
}

const HeroItem = (props: PostI) => {
  let dynamicClass = "full-width ";
  if (props.post.slug === "landscape-vs-potrait") {
    dynamicClass += "full-height";
  }
  return (
	<section className="v-hero-item-section">
		<Row justify="center">
			<Col sm={20} xs={24}>
				<div className="v-hero-item">
					<div className="v-hero-item__image">
						<div className={`${dynamicClass}`}>
							<img className={`${props?.post?.slug}`} src={props.post && props.post.img_src ? props.post.img_src : '../images/blog/hero-post.jpg"'}
								alt={`${props?.post?.meta_title}`} width="100%" />
						</div>
					</div>
					{props?.post?.published_at && <div className="v-hero-item-publish">
						<p><i>Published on {moment(+props?.post?.published_at).format('MMMM Do, YYYY')}</i></p>
					</div>}
				</div>
			</Col>
		</Row>
	</section>
  )
}


const MainContainer = (props: MainContainerI) => {
  return (
	<section className="v-blog-maincontainer">
		<Row justify="center">
			<Col sm={20} xs={24}>
				<Row gutter={32}>
					<Col sm={16} xs={24}>
						<Post post={props.post} themeDark={props.themeDark} />
					</Col>
					<Col sm={8} xs={24}>
						<Sidebar {...props} themeDark={props.themeDark} />
					</Col>
				</Row>
			</Col>
		</Row>
	</section>
  )
}

const Post = (props: PostContainerI) => {
  const articleClass = props.themeDark ? 'blog-article' : 'blog-article blog-article--light'
  return (
	<article className={articleClass}>
		{props.post && <div dangerouslySetInnerHTML={{ __html: props.post.content ? props.post.content : '' }}></div>}
	</article>
  )
}


const Sidebar = (props: SidebarI) => {
  const searchClass = props.themeDark ? 'v-search' : 'v-search v-search--light'
  const svgIconsColor = props.themeDark ? '#FFFFFF' : '#9B9B9B'
  const searchIcon = <SearchIconSvg style={{ fill: svgIconsColor }} />
  return (
	<aside className="v-sidebar">

		{/*<Input prefix={searchIcon} className={searchClass} placeholder="Search posts" />*/}
		<Bethefirst />
		<PopularPosts popularItems={props.popularItems} themeDark={props.themeDark} />
	</aside>
  )
}


const PopularPosts = (props: PopularPostsI) => {
  const popularClass = props.themeDark ? 'v-popular-posts-container' : 'v-popular-posts-container v-popular-posts-container--light'
  return (
	<div className={popularClass}>
		<h3>Popular Posts</h3>
		<ul className="v-popular-posts">
			{props.popularItems && props.popularItems.map((blog, index) => {
				return (
					<li key={index} className="v-popular-item">
						<span className="v-popular-item__category">{blog && blog.category}</span>
						<span className="v-popular-item__title">
							<Link to={{ pathname: `/blog/${blog.slug}` }}>{blog.title}</Link>
						</span>
					</li>
          )
        })}
		</ul>
	</div>
  )
}

const AuthorSection = (props: any) => {
  const authorClass = props.themeDark ? 'v-author-card-section' : 'v-author-card-section v-author-card-section--light'
  const socialClass = props.themeDark ? 'v-social-link-section' : 'v-social-link-section v-social-link-section--light'

	const {
		name,
		description,
		avatar_url,
		facebook_url,
		linkedin_url,
		youtube_url,
		twitter_url,
	} = props.authorData;

  return (
	<>
		<section className={authorClass}>
			<Row justify="center">
				<Col sm={20} xs={24}>
					<Row gutter={32}>
						<Col sm={16} xs={24}>
							<Card className="v-card">
								<Row gutter={32}>
									<Col sm={3} xs={24}>
										<img src={avatar_url ? avatar_url : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} alt="avtar" className="v-avtar v-desktop-avtar"/>
									</Col>
									<Col sm={21} xs={24}>
										<div className="v-desktop-avtar">
											<h2>About the author</h2>
											<h4>{name}</h4>
											<p>{description}</p>
										</div>
										<div className="v-mobile-avtar">
											<div className="v-avtar-name">
												<img src="/images/blog/video-is-king/using-vidiren-to-create-an-all-video-website.jpg" alt="avtar" className="v-avtar"/>
												<h4>{name}</h4>
											</div>
											<p>{description}</p>
										</div>
									</Col>
								</Row>
							</Card>
						</Col>
						<Col sm={8} xs={24}></Col>
					</Row>
				</Col>
			</Row>
		</section>
		<section className={socialClass}>
			<Row justify="center">
				<Col sm={20} xs={24}>
					<Row gutter={32}>
						<Col sm={16} xs={24}>
							<div className="v-footer-social-links">
								<ul>
									<li><a href={facebook_url} target="_blank"><FacebookSvg /></a></li>
									<li><a href={twitter_url} target="_blank"><TwitterSvg /></a></li>
									<li><a href={linkedin_url} target="_blank"><LinkedinSvg /></a></li>
									<li><a href={youtube_url} target="_blank"><YoutubeSvg /></a></li>
								</ul>
							</div>
						</Col>
						<Col sm={8} xs={24}></Col>
					</Row>
				</Col>
			</Row>

		</section>
	</>
  )
}

const CommentListSection = (props: any) => {
  const commentClass = props.themeDark ? 'v-comment-section' : 'v-comment-section v-comment-section--light'
	const { postId, commentStatus, onComment } = props;

	const { data: blogComments, loading: commentLoading, refetch: getPostComment } = useQuery<any, any>(BLOG.getComments(), {
		variables: {
			id: 0,
		},
	});

	useEffect(() => {
		postId && getPostComment({
			id: +postId,
		})
	}, [postId, commentStatus]);

	useEffect(() => {
		onComment(false);
	}, [blogComments]);

  return (
	  <section className={commentClass}>
		<Row justify="center">
			<Col sm={20} xs={24}>
				<Row gutter={32}>
					<Col sm={16} xs={24}>
						<h2>{blogComments && blogComments.getComments && blogComments.getComments.data && blogComments.getComments.data.length} comments</h2>
						{blogComments && blogComments.getComments && blogComments.getComments.data && blogComments.getComments.data.map((item: any) => {
							const { username, content, created_at } = item;
							return <Row gutter={16}>
								<Col sm={1} xs={24} >
									<div className="v-desktop-avtar">
										<AvatarSvg/>
									</div>
								</Col>
								<Col sm={22} xs={24}>

									<p className="v-comment-name-date">
										<div className="v-mobile-avtar">
											<AvatarSvg/>
										</div>
										<span className="v-user-name">{username} | </span>
										<span className="v-user-date">{moment.unix((+created_at) / 1000).format("Do MMMM, YYYY")}</span>
									</p>
									<p className="v-comment-text">
										{content}
									</p>
								</Col>
							</Row>
						})}
					</Col>
					<Col sm={8} xs={24}></Col>
				</Row>
			</Col>
		</Row>

	</section>
  )
}

/* Newsletter */
const NewsLetter = (props:any) => {
	const context:any = useContext(AuthContext)

	const [submitted, setSubmitted] = useState(false)

	const [saveNewsletter] = useMutation(NEWSLETTER.save(), {
		onCompleted(data) {
			if (data?.newsletterForm?.message === 'Success') {
				setSubmitted(true)
			} else {
				context.showAlert(data?.newsletterForm?.message, 'error')
			}
		},
		onError() {
			context.showAlert('Something went wrong!', 'error')
		},
	})

	const [thankState, setThankState] = useState(false)

	useEffect(() => {
		if (submitted && !thankState) setThankState(!thankState)
	}, [submitted, thankState])

	const onFinish = (value: any) => {
		saveNewsletter({ variables: { email : value.email, blog: true, url: window.location.href } })
	}

	return (
		<section className="v-new-feature">
			<Row justify="center">
				<Col sm={19} xs={24} className="v-set-zindex">
					<Row>
						<Col xs={{ span: 24, offset: 0, order: 1 }} lg={{ span: 11, offset: 1, order: 1  }}>
							<div className="v-title">
								<h3><span>Be the first to learn <br />about our new features</span></h3>
								<span	className="v-unic-fontset">
									Receive behind-the-scene news on our innovations, and tips on building stunning video commerce sites
								</span>
							</div>
						</Col>
						<Col xs={{ span: 24, offset: 0, order: 2 }} lg={{ span: 11, offset: 1, order: 2  }}>
							<Form name="v-request-demo" onFinish={onFinish} autoComplete="off">
								<div className="v-enter-email">
									<CSSTransition in={thankState} timeout={2000} classNames="v-thank">
										<div className="v-enter-email-content">
											<Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please write valid email!' }]}								>
												<input type="email" name="email" placeholder="Enter your email address" id="blog-item-email"/>
											</Form.Item>
											<VButton type="button" htmlType="submit">
												Get Informed
											</VButton>
											<div className="v-email-message">Thank You! </div>
										</div>
									</CSSTransition>
								</div>
								<div className="v-checkbox-feature">
									<Form.Item
										name="agree"
										rules={[{ required: true, message: 'You must agree to the Privacy Policy & Terms of service' }]}
									>
										<VCheckbox>
											Sign me up to the Newsletter (I can unsubscribe anytime).<br /> More on this in our Privacy Policy
										</VCheckbox>
									</Form.Item>
								</div>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		</section>
	)
}


const CommentForm = (props: any) => {
	const context:any = useContext(AuthContext);
	const [form] = Form.useForm();
	const { postId, onComment } = props

	const [commentSubmitted, setCommentSubmitted] = useState(false)

	const [saveComment] = useMutation(BLOG.save(), {
		errorPolicy: 'all',
		onCompleted() {
			setCommentSubmitted(true)
		},
		onError() {
			setCommentSubmitted(true)
			context.showAlert('Something went wrong!', 'error')
		},
	})

	React.useEffect(() => {
		if (commentSubmitted) {
			form.resetFields()
			onComment(true);
		}
	}, [commentSubmitted, form])

	const submitContactForm = (form: any) => {
		saveComment({ variables: form})
	}

	const onFinish = (values:any) => {
		delete values.privacy
		const formValues = {
			post_id: +postId,
			...values,
			newsletter:
				values.newsletter && values.newsletter.target && values.newsletter.target.checked
					? values.newsletter.target.checked
					: false,
		}
		submitContactForm({...formValues} )
	}

  return (
	<section className="v-comment-form">
		<Row justify="center">
			<Col sm={20} xs={24}>
				<Row gutter={32}>
					<Col sm={16} xs={24}>
						<h2>Add Your Comment</h2>
						<div className="v-comment-form-container">
							<Form name="v-request-demo" id="contactForm" form={form} onFinish={onFinish}  autoComplete="off" >
								<Row>
									<Col span={24}>
										<Form.Item
											name="content"
											rules={[
												{
													required: true,
													message: 'Please write message!',
												},
											]}
										>
											<TextArea rows={6} placeholder="Write your comment here... *" className="v-textarea" />
										</Form.Item>
									</Col>
								</Row>
								<Row gutter={12}>
									<Col xs={{ span: 24 }} lg={{ span: 8 }}>
										<Form.Item
											name="username"
											rules={[
												{
													required: true,
													message: 'Please write your name!',
												},
											]}
										>
											<Input placeholder="Your Name *" className="v-input" />
										</Form.Item>
									</Col>
									<Col xs={{ span: 24 }} lg={{ span: 8 }}>
										<Form.Item
											name="email"
											rules={[
												{
													required: true,
													type: 'email',
													message: 'Please write valid email!',
												},
											]}
										>
											<Input placeholder="Your Email *" className="v-input" />
										</Form.Item>
									</Col>
								</Row>

								<Row>
									<Col span={24}>
										<Form.Item
											name="privacy"
											rules={[
												{
													required: true,
													message: 'You must agree to Privacy Policy & Terms of Service',
												},
											]}
										>
											<VCheckbox>
												I have read and agree to the <Link to="/privacy" title="Vidiren User Privacy Policy">Privacy
													Policy</Link> & <Link to="/terms" title="Vidiren Terms of Use">Terms of service</Link>
											</VCheckbox>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col>
										<Form.Item>
											<VButton htmlType="submit">Submit</VButton>
										</Form.Item>
									</Col>
								</Row>
							</Form>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	</section>
  )
}

export default BlogItem
