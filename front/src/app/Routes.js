import React, { Fragment } from "react";
import universal from "react-universal-component";
import { Route, Switch, useLocation } from 'react-router'
import { RedirectWithStatus } from "../Components/RedirectStatus";
import GoogleTagManager from "../Components/GoogleTagManager";
import { OrganizationJSONLD } from "./../helpers/richsnippet";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Loading } from "../Components/Layout";
import AuthContext from '../helpers/authContext'
import universalImport from 'babel-plugin-universal-import/universalImport'

const isProd = process.env.NODE_ENV === "production";

const asyncWork = () =>
  universalImport({
    chunkName: ({ page }) => `${page}`,
    resolve: ({ page }) => require.resolveWeak(`../Views/${page}`),
    load: ({ page }) =>
      Promise.all([
        import(/* webpackChunkName: '[request]' */ `../Views/${page}`),
        // importCss(page),
      ]).then(proms => proms[0]),
	})
	
const UniversalComponent = universal(asyncWork, { minDelay: 600,  loading: () => <Loading />, alwaysDelay:true})
export const routes = [
	{
		exact: true,
		path: `/contact`,
		page: "Contact",
	},
	{
		exact: true,
		path: `/faqs`,
		page: "Faqs",
	},
	{
		exact: true,
		path: `/blog`,
		page: "Blog",
	},
	{
		exact: true,
		path: `/blog/:slug`,
		page: "BlogItem",
	},
	{
		exact: true,
		path: `/newsletter-confirmation/:token`,
		page: 'ConfirmationMessage',
	},
	{
		path: '/:page',
		page: "StaticPage",
		exact: true,
	},
	{
		exact: true,
		path: `/`,
		page: 'Home',
	}
];


export default (props) => {
	const context = React.useContext(AuthContext)
	const { themeDark } = context;

	const location = useLocation();

	const initState = props.isMobile ? true : false
	const [show, setShow]= React.useState(false)
	React.useEffect(()=>{
		if (show) return

    setTimeout(() => {
      // console.log('...')
      setShow(true)
    }, 900)
	},[show])

	const HeaderColorChange = (location.pathname === '/contact' || location.pathname === '/confirmationMessage') ? 'v-message-sent': ''

	return(
		<Fragment>
			<OrganizationJSONLD/>
			{isProd ? <GoogleTagManager gtmId="GTM-WFTXGC8" /> : ""}
			<div className={`v-container ${HeaderColorChange} ${themeDark ? 'v-container--dark' : 'v-container--light'}`}>
				<Nav />
				{show ? <Switch>
					{routes.map((route) => (
						<Route
							key={route.path}
							render={(routeProps) => (
								<UniversalComponent
									page={route.page}
									loading={show}
									{...routeProps}
							/>
						
						)}
							{...route}
					/>
				))}
					<RedirectWithStatus
						status={301}
						exact
						from="/"
						to={`/`}
				/>
					<Route
						render={(routeProps) => (
							<UniversalComponent page="NotFound" {...routeProps} />
					)}
				/>
				</Switch> : <Loading />}
				<Footer {...props}/>
			</div>
		</Fragment>
	)
}
