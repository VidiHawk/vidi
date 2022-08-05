import React, { useEffect, useContext, useState, useRef } from 'react'
import { Row, Col, Input, Form } from 'antd'
import { Link } from 'react-router-dom'
import AuthContext from '../../helpers/authContext'
import { BlogBottomMobileSvg, BlogBottomSvg, TopBg } from '../../assets/svg'

import { useMutation, useQuery } from '@apollo/client'
import { BLOG } from '../../lib/graphql/queries'
import {
  getAllPosts,getAllPosts_getAllPosts_data, getAllPosts_getAllPosts,
} from "../../lib/graphql/queries/Blog/__generated__/getAllPosts";

import {SearchIconSvg} from '../../assets/svg'
import Head from "../../Components/Head";
import { Loading } from "../../Components/Layout";
import VButton from '../../Components/Common/VButton'
import VCheckbox from '../../Components/Common/VCheckbox'
import { NEWSLETTER } from '../../lib/mutations/Newsletter'
import { CSSTransition } from 'react-transition-group'
import moment from 'moment';


interface HeroSectionI {
	heroPost: getAllPosts_getAllPosts_data | null
}
interface BlogItemsI {
	items: getAllPosts_getAllPosts_data[]
}

const Blog =(props:any) =>{
  const context = useContext(AuthContext)
	const themeDark = context.themeDark

	const {  data: blogListData , loading} = useQuery<getAllPosts>(BLOG.getPosts())

	const blogList = blogListData ? blogListData.getAllPosts : null
	const blogData = blogList ? blogList.data : null
	const heroPostData = blogData ? blogData[0] : null

  const svgBgColor = themeDark ? '#060606' : '#F0F1F6'
  const svgIconsColor = themeDark ? '#FFFFFF' : '#060606'

  useEffect(() => {}, [])

	const onSearch = () => {}
	if (loading) return(<Loading />)

  return (
	<>
		<Head title="First Video Commerce | Video Content Marketing | Vidiren Blog" description="Check the latest blogs about video ecommerce and online marketing. The trend in digital media has been shifting towards video content." url="https://vidiren.com/blog"/>
		<div className="v-blog">
			<HeaderSection {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor} onSearch={onSearch} themeDark={themeDark}/>
			{heroPostData && <HeroItem heroPost={heroPostData} {...props}/>}
			<BlogItems
				items={blogData && blogData.slice(1)}
				svgBgColor={svgBgColor}
				svgIconsColor={svgIconsColor}
				onSearch={onSearch}
				{...props}
      />
		</div>

		<NewsLetter/>
		<BlogBottomSvg className="custom-blog-svg black-svg" />
		<BlogBottomMobileSvg className="blog-mobile-svg black-svg" />
	</>
  )
}

const HeaderSection = (props:any) => {
	const searchClass = props.themeDark ? 'v-search' : 'v-search v-search--light'
	const svgIconsColor = props.themeDark ? '#FFFFFF' : '#9B9B9B'
  const searchIcon = <SearchIconSvg style={{ fill: svgIconsColor }} />
  return (
	<section className="v-hero-post">
		<TopBg className="v-svgBg black-svg" />
		<Row justify="center">
			<Col>
				<div className="v-header">
					<div className="v-heading">
						<h1 className="v-heading__title">Latest news & updates </h1>
						<p className="v-heading__sub-title">Blog about video ecommerce and online marketing</p>
					</div>
					{/*<Input prefix={searchIcon} className={searchClass} value={searchValue} placeholder="Search posts" onChange={ (e) => onChangeSearch(e.target.value)} />*/}
				</div>
			</Col>
		</Row>
	</section>
  )
}

const HeroItem = (props:HeroSectionI) => {
  return (
	<section className="v-hero-item-section">
		<Row justify="center">
			<Col sm={19} xs={24}>
				<div className="v-hero-item">
					<div className="v-hero-item__image">
						<Link to={{ pathname: `blog/${props?.heroPost?.slug}`}}>
							<img className={`${props?.heroPost?.slug}`} src={props.heroPost && props.heroPost.img_src ? props.heroPost.img_src : '../images/blog/hero-post.jpg"'} alt={`${props.heroPost?.meta_title}`} width="100%" />
						</Link>
					</div>

					<div className="v-hero-item__desc">
						<span className="v-hero-item__desc__category">{props.heroPost && props.heroPost.category}</span>
						<Link to={{ pathname: `blog/${props?.heroPost?.slug}`}}>
              <h2></h2>
							<h3 className="v-hero-item__desc__title">{props.heroPost && props.heroPost.title}</h3>
						</Link>
						{props.heroPost?.published_at && <div className="v-hero-item-publish">
							<p><i>Published on {moment(+props.heroPost?.published_at).format('MMMM Do, YYYY')}</i></p>
						</div>}
						<p className="v-hero-item__desc__text">
							{props.heroPost && props.heroPost.description}
						</p>
					</div>
				</div>
			</Col>
		</Row>
	</section>
  )
}

const BlogItems = (props:BlogItemsI) => {
  return (
	<section className="v-blog-list-section">
		<Row justify="center">
			<Col xs={{ span: 24, offset: 0, order: 1 }} md={{ span:19 }} lg={{ span: 19, offset: 0, order: 1  }}>
				<div className="v-blog-list">
					{props.items && props.items.map((item:any, index:any) => {
              return <BlogItem item={item} key={index} {...props} />
            })}
				</div>
			</Col>
		</Row>
		<Row justify="center">
			<Col xs={{ span: 24, offset: 0, order: 1 }} lg={{ span: 19, offset: 0, order: 1  }}>
				<div className="v-devider-space"><hr/></div>
			</Col>
		</Row>
	</section>
  )
}

const BlogItem = (props:any) => {
  return (
	<div className="v-blog-item">
		<div className="v-blog-item__image">
			<Link to={{ pathname: `${props.location.pathname}/${props.item.slug}`}}>
				<img src={`${props.item.img_src}`} alt={`${props.item.meta_title}`} width="100%" />
			</Link>
		</div>
		<div className="v-blog-item__desc">
			<span className="v-blog-item__desc__category">{props.item.category}</span>
			<h3 className="v-blog-item__desc__title"><Link to={{ pathname: `${props.location.pathname}/${props.item.slug}` }}>{props.item.title}</Link></h3>
			{props.item?.published_at && <div className="v-hero-item-publish">
				<p><i>Published on {moment(+props.item?.published_at).format('MMMM Do, YYYY')}</i></p>
			</div>}
			<p className="v-blog-item__desc__text">{props.item.description}</p>
		</div>
	</div>

  )
}

const NewsLetter = (props:any) => {
	const context:any = useContext(AuthContext)

	const [submitted, setSubmitted] = useState(false)

	const [saveNewsletter] = useMutation(NEWSLETTER.save(), {
		onCompleted(data) {
			if (data?.newsletterForm?.message === 'Success') {
				setSubmitted(true);
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
                <h2></h2>
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
												<input type="email" name="email" placeholder="Enter your email address" id="blog-email" />
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

export default Blog
