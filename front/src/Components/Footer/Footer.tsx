import React from "react";
import { Row, Col } from 'antd'
import AuthContext from '../../helpers/authContext'
import { Link } from 'react-router-dom'

import { FacebookSvg, LinkedinSvg, TwitterSvg, YoutubeSvg } from '../../assets/svg'

interface FooterProps {
	className?: string;
}

function Footer({ className }: FooterProps) {
	const context:any = React.useContext(AuthContext)
  const themeDark = context.themeDark
  const themClass = themeDark ? 'v-footer-container--dark' : 'v-footer-container--light'

  const linkClicked = () => {
    // context.scrollTop()
  }
	return (
		<section id="footer">
			<Row justify="center">
				<Col xs={24} sm={{span: 18}} lg={{ span: 16 }} xl={{ span: 14, offset: 3 }}>
					<footer className={`v-footer-container ${themClass}`}>
						<Row gutter={{ lg: 24 }}>
							<Col xs={{ span: 23, offset: 0 }} sm={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} className="footer-option">
								<div className="v-footer-links">
									<Link to="/faqs" title="Vidi Commerce Frequent Questions">Frequent Questions</Link>
									<Link to="/blog" title="Vidi Commerce Blog">Blog</Link>
									<Link to="/contact" title="Vidi Commerce Terms of Use">
										Contact
									</Link>
								</div>
							</Col>
							<Col xs={{ span: 23, offset: 0 }} sm={{ span: 7, offset: 0 }} lg={{ span: 6, offset: 0 }} xl={{ span: 6, offset: 0 }} className="footer-option">
								<div className="v-footer-links">
									<Link to="/terms" onClick={() => linkClicked()} title="Vidi Commerce Terms of Use">
										Terms of Service
									</Link>
									<Link to="/privacy" onClick={() => linkClicked()} title="Vidi Commerce User Privacy Policy">
										Privacy Policy
									</Link>
								</div>

							</Col>
							<Col xs={{ span: 23, offset: 0 }} sm={{ span: 10, offset: 0 }} lg={{ span: 8, offset: 0 }} xl={{ span: 6, offset: 0 }} className="footer-option">
								<address className="footer-address">
									<b>Vidi Rendering Technologies</b>
									<div className="space"></div>
									Avenue Louise 54 | Brussels
									<div className="space"></div>
									663 Clear Water Bay road | Hong Kong
									<div className="space"></div>
									8383 Wilshire Blvd | Los Angeles 90211 California
								</address>
							</Col>
						</Row>
						<Row gutter={{ lg: 24 }}>
							<Col xs={{ span: 12, offset: 0 }} md={{ span: 7 }} lg={{ span: 6, offset: 0 }} className="footer-option-link">
								© {new Date().getFullYear()} Vidi Rendering Technologies
							</Col>
							<Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }} className="footer-option-link">
								<div className="v-footer-social-links">
									<ul>
										<li><a href="/" target="_blank" aria-label="Facebook"><FacebookSvg /></a></li>
										<li><a href="/" target="_blank" aria-label="Twitter"><TwitterSvg/></a></li>
										<li><a href="/" target="_blank" aria-label="LinkedIn"><LinkedinSvg/></a></li>
										<li><a href="/" target="_blank" aria-label="Youtube"><YoutubeSvg/></a></li>
									</ul>
								</div>
							</Col>
						</Row>
					</footer>
				</Col>
			</Row>
		</section>
	);
}

export default Footer;
