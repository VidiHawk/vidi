import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";


import VButton from '../Common/VButton'

import { DarkThemeLogo, LightThemeLogo, Hamburger, CloseMenu, MenuBgOneSvg, MenuBgTwoSvg} from "../../assets/svg";
import { Switch } from 'antd'
import AuthContext from '../../helpers/authContext'

interface NavProps {
	location: any;
	lang: string;
	history: any;
	themeDark: boolean
}

interface NavState {
	themeDark: boolean
}


const Nav = withRouter((props)=>{

		// const { location, lang, history } = this.props;
		const context = React.useContext(AuthContext)
		const { themeDark, headerChange } = context;
		const location = useLocation()

		const [isOpen, setIsOpen] = React.useState(false);
		
		const themLabel:any = themeDark ? 'Dark' : 'Light'
	
		const checkedLabel = themeDark ? true: false
		const hamburgerFill = themeDark ? '#ffffff' : '#191919'

		const onChange = () => {
			context.changeTheme()
		}

		const handleClick = () =>{
			closeMenu();
		}

		const openMenu = () =>{
			setIsOpen(true);
			document.body.classList.add('menu-open');
			let animateMenu = document.getElementById('animate-menu')
			if(animateMenu){
					animateMenu.classList.remove("d-none");
					setTimeout(() => { if(animateMenu) animateMenu.classList.add("in") }, 100);
			}
		}
	
		const closeMenu = () =>{
			setIsOpen(false);
			document.body.classList.remove('menu-open');
			let animateMenu = document.getElementById('animate-menu')
			if(animateMenu){
				animateMenu.classList.add("d-none");
				animateMenu.classList.remove("in");
			}
		}

		const activePage = location.pathname.split("/")[1]

		/*
		for change the header color on confirmation page
		 */
		const isHeaderChange = (headerChange && (activePage === 'contact' || activePage === '')) || activePage === 'confirmation-message' ? 'v-confo-navigation' : ''

		return (
			<>
				<div className={`v-navigation ${isOpen ? 'isOpen': ''} ${isHeaderChange}`} id="topNav">
					<div className="v-navinner">
						<Link to="/" title="Vidi Commerce Official Website" className="v-logo" onClick={()=>closeMenu()}>
							{themeDark ? <DarkThemeLogo /> : <LightThemeLogo />}
						</Link>
						{!isOpen && <div className="v-nav-hamburger" onClick={openMenu}>
							<Hamburger style={{fill: hamburgerFill}}/>
						</div>}
						<div className="animate-menu d-none" id="animate-menu">
							<nav className={`v-nav ${isOpen ? 'isOpen': ''}`} onClick={handleClick}>
								<ul className={`v-menu v-menu--${themLabel.toLowerCase()}`}>
									<li className={`v-menu__item ${activePage === 'faqs' && 'active'}`}>
										<Link to="/faqs">FAQ</Link>
									</li>
									<li className={`v-menu__item ${activePage === 'blog' && 'active'}`}>
										<Link to="/blog" title="See our blog about video commerce">Blog</Link>
									</li>
									<li className="v-menu__item v-menu__item--nobg">
										<span className="theme-switch-wrapper">
											<label>{themLabel}</label>
											<Switch className="theme-switch" title={themLabel} checked={checkedLabel} onChange={onChange}/>
										</span>
									</li>
									<li className="v-menu__item v-menu__item--nobg">
										<Link to="/contact" title="Contact Vidi Commerce">
											<VButton>Contact Us</VButton>
										</Link>
									</li>
								</ul>
							</nav>
							<MenuBgOneSvg className="animate-menu-bg1 black-svg"/>
							<MenuBgTwoSvg className="animate-menu-bg2 grey-svg"/>
						</div>
					</div>
				
				</div>
				{isOpen && 
				<>
					<CloseMenu onClick={closeMenu} className="v-close-menu"/>
					<div className="v-overlay"/>
				</>
        }
			</>
		);
})


export default Nav
