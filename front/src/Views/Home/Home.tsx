import React, { useEffect, useState, useContext, useRef } from 'react'

import AuthContext from '../../helpers/authContext'
import {CONTACT, NEWSLETTER} from '../../lib/mutations'

import { useMutation } from '@apollo/client'

import Head from "../../Components/Head";

import {
  HeroSection,
  StunningVideo,
  ShoppingSection,
  UniteBrand,
  ResponsiveCommerce,
  AdminSection,
  BottomSection,
  ConfirmationMessage,
} from './sections'
import {
  ContactUsBottomMobileSvg,
  ContactUsConfirmationSvg,
} from '../../assets/svg'
import { useHistory } from 'react-router-dom'

// import MuteSvg from '../../../public/images/home/mute.svg'
// import WaveHorizontalSvg from '../../../public/images/home/wave-horizontal-full.svg'

interface HomePageI {

}
interface SubmitContactFormI {
	variables : {
		message: string,
		newsletter: string
	}
}

const Home = React.memo((props:HomePageI) => {
  const context:any = useContext(AuthContext)
  const history = useHistory();
  const { themeDark, changeHeaderColor, headerChange } = context;
  const [submitted, setSubmitted] = useState(false)
  const [contactsubmitted, setContactsubmitted] = useState(false)

  useEffect(() => {
    headerChange && changeHeaderColor(false)
    setContactsubmitted(false);
  }, [history.location.key])

  const [saveContact] = useMutation(CONTACT.save(), {
    errorPolicy: 'all',
    onCompleted(data) {
      if (data?.contactForm?.message === 'Success') {
        setContactsubmitted(true)
        changeHeaderColor(true)
      } else {
        context.showAlert(data?.contactForm?.message, 'error')
      }
    },
    onError() {
      context.showAlert('Something went wrong!', 'error')
    },
  })

  const svgBgColor = themeDark ? '#060606' : '#F0F1F6'
  const svgIconsColor = themeDark ? '#FFFFFF' : '#060606'

  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)
  const video4Ref = useRef<HTMLVideoElement>(null)
  const video5Ref = useRef<HTMLVideoElement>(null)

	const [saveNewsletter] = useMutation(NEWSLETTER.save(), {
    onCompleted(data) {
      if (data?.newsletterForm?.message === 'Success') {
        setSubmitted(true);
        changeHeaderColor(true);
      } else {
        context.showAlert(data?.newsletterForm?.message, 'error')
      }
    },
    onError() {
      context.showAlert('Something went wrong!', 'error')
    },
  })

  const submitContactForm = (form:SubmitContactFormI) => {
    saveContact({ variables: form })
  }

  const playVideo = (visible:any) => {
    if (visible.inViewport) {
      // Part of the element is in the viewport (the area defined by the offset property)
      if (video1Ref.current) {
        video1Ref.current.play()
      }
      if (video2Ref.current) {
        video2Ref.current.play()
      }
      if (video3Ref.current) {
        video3Ref.current.play()
      }
      if (video4Ref.current) {
        video4Ref.current.play()
      }
      if(video5Ref.current) {
        video5Ref.current.play()
      }
    } else if (visible.onScreen) {
      // Part of the element is visible on the screen
    } else {
			// Element is no longer visible
			if(video1Ref.current !== null) video1Ref.current.pause()
			if(video2Ref.current !== null) video2Ref.current.pause()
			if(video3Ref.current !== null) video3Ref.current.pause()
			if(video4Ref.current !== null) video4Ref.current.pause()
			if(video5Ref.current !== null) video5Ref.current.pause()
    }
  }

  return (
	<>
		<Head title="Video Commerce Website | Full Video Shopping | Vidiren" description="Vidiren is the first video commerce website builder in the world. Create all-video commerce website that are mobile friendly and customer-centric."></Head>
		<div className="v-home">
			{contactsubmitted ?
				<>
					<ConfirmationMessage/>
					<ContactUsConfirmationSvg style={{ fill: svgIconsColor }} className="conformation-custom-svg black-svg"/>
					<ContactUsBottomMobileSvg className="custom-mobile black-svg"/>
				</> :
				<>
					<HeroSection
						playVideo={playVideo}
						video1Ref={video1Ref}
						saveNewsletter={saveNewsletter}
						submitted={submitted}
						svgIconsColor={svgIconsColor}
          />
					<StunningVideo
						{...props}
						playVideo={playVideo}
						video2Ref={video2Ref}
						svgBgColor={svgBgColor}
						svgIconsColor={svgIconsColor}
          />
					<ShoppingSection
						{...props}
						playVideo={playVideo}
						video3Ref={video3Ref}
						svgBgColor={svgBgColor}
						svgIconsColor={svgIconsColor}
          />
					<UniteBrand {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor}/>
					<ResponsiveCommerce {...props} video4Ref={video4Ref} video5Ref={video5Ref} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor}
						playVideo={playVideo} theme={themeDark}/>
					<AdminSection {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor} theme={themeDark}/>
					<BottomSection {...props} svgBgColor={svgBgColor} svgIconsColor={svgIconsColor}
						contactsubmitted={contactsubmitted} submitContactForm={submitContactForm}/>
				</>}
		</div>
	</>
  )
})

export default Home
