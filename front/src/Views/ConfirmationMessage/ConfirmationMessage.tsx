import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import AuthContext from '../../helpers/authContext'
import { ContactUsBottomMobileSvg, RightSing, ContactUsConfirmationSvg, WrongSign } from '../../assets/svg'
import Head from "../../Components/Head";
import { useMutation } from '@apollo/client'
import { NEWSLETTER } from '../../lib/mutations/Newsletter'
import { useHistory } from 'react-router'

const ConfirmationMessage =(props: any) =>{
  const context:any = useContext(AuthContext);
  const history = useHistory();
  const { themeDark } = context;
  const svgIconsColor = themeDark ? '#f8f9fe' : '#060606'
  const [newsLetterConfirmed, setNewsLetterConfirmed]= useState<boolean>(false);
  const [loading, setLoading]= useState<boolean>(true);
  const [verifyToken, {data: verifyResponse}] = useMutation(NEWSLETTER.verifyToken(), {
    onCompleted() {
      setLoading(false);
    },
    onError() {
      context.showAlert('Something went wrong!', 'error')
      history.push('/');
    }
  });

  useEffect(() => {
    if(verifyResponse && !verifyResponse?.newsletterFormVerify.error) {
      setNewsLetterConfirmed(true);
      setLoading(false);
    }
  },[verifyResponse])

  useEffect(() => {
    if(props?.match?.params?.token) {
      verifyToken({variables: {
          token: props.match.params.token
        }})
    } else {
      history.push('/');
    }
  },[]);

  return (
    <>
      <Head
        title="Vidiren Official Website | Video Commerce | Contact"
        description="Contact about video ecommerce and online marketing. Learn the latest news and best practices about
                      video commerce."
        keywords="video commerce news, live-stream commerce trends, web builder for video commerce blog, video website builder, how to create a video commerce website, tell your brand story through videos, unite your brand community on your own site, fully customizable video ecommerce web-builder, sell more products with videos, mobile-first video shopping, best video commerce builder 2021, Here's Why You Should Focus More on Video Content, How to produce videos that sell, How to tell your brands story through video?, Live commerce is taking online commerce by storm, How to organize your team to produce high quality videos, 3 tips to create Video Content that Sells, How-to videos - a growth driver for ecommerce, Best Ecommerce builders you should try, Video content marketing is king, best video agencies for e-commerce, How to reduce your reliance on social media and move your audience to your own website, Why all your videos should be shot in vertical mode, How to publish SEO friendly videos, Why App Marketplaces are really unsafe for personal user data, Why you shouldn’t embed YouTube videos on your website, Why all your content should be mobile-first, What is video rendering?, Building stronger relationship with your brand community with Vidiren, Why Vidiren allows you to build faster and less prone to error websites, How to script great videos"
        url="https://vidiren.com/blog"/>
      <div className="v-contact">
        {!loading && <section className="v-conformation">
          <ConfirmationMessageText newsLetterConfirmed={newsLetterConfirmed} errorMessage={verifyResponse?.newsletterFormVerify?.message}/>
          <ContactUsConfirmationSvg style={{ fill: svgIconsColor }} className="conformation-custom-svg black-svg"/>
          <ContactUsBottomMobileSvg className="custom-mobile black-svg"/>
        </section>}
      </div>
    </>
  )
}

const ConfirmationMessageText = (props: any) => {
  return (
    <section className="v-conformation-section">
      <Row justify="center">
        <Col>
          <div className="v-header">
            {props?.newsLetterConfirmed ?
            <div className="v-heading">
              <RightSing />
              <h1 className="v-heading__title mb-fotn">Thank you for  confirming your email address!</h1>
            </div> :
              <div className="v-heading">
                <WrongSign/>
                <h1 className="v-heading__title mb-fotn">{props?.errorMessage}</h1>
              </div>}
          </div>
        </Col>
      </Row>
    </section>
  )
}

export default ConfirmationMessage
