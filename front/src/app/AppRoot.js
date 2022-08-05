import "@babel/polyfill";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ApolloProvider } from '@apollo/client'
import ToastMessage from '../Components/Common/ToastMessage'
import GraphClient from '../lib/client'
import AuthContext from '../helpers/authContext'
import Metadata from '../helpers/metadata'
import ScrollToTop from "../Components/ScrollToTop";

const client = GraphClient.getGraphClient()

export default class extends React.Component {
	constructor(props) {
    
    super(props)
    this.state = {
      themeDark: true,
      isMenu: false,
      status: props.status,
      toast: '',
      isToastMessage: false,
      serverRequest: props.serverRequest,
      mobile: {
        isMobile: props.isMobile,
      },
      isChangeHeaderColor: false,
    }
    this.setLocalstorage = this.setLocalstorage.bind(this)
    this.getLocalstorage = this.getLocalstorage.bind(this)
	}
	
	componentDidMount() {
    const storageTheme = this.getLocalstorage('themeDark', true)
    if (storageTheme == null) this.setLocalstorage('themeDark', true)
    else this.setState({ themeDark: storageTheme })
	}

	getLocalstorage (key, isJSON) {
    let value = localStorage.getItem(key)
    if (isJSON) {
      value = JSON.parse(value)
    }
    return value
  }
  
	setLocalstorage (key, value) {
    localStorage.setItem(key, value)
    return true
  }
	changeServerStatus() {
    this.setState({ serverRequest: false })
	}
	
	scrollTop(divId = '') {
    if (divId) document.getElementById(divId).scrollTo(0, 0)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 500)
	}

  changeTheme() {
    this.setLocalstorage('themeDark', !this.state.themeDark)
    this.setState({ themeDark: !this.state.themeDark })
  }

  changeHeaderColor() {
    this.setState({ isChangeHeaderColor: !this.state.isChangeHeaderColor })
  }

  closeToast() {
    this.setState({ isToastMessage: false, toast: {} })
  }

  showAlert(message, type = 'success') {
    this.setState(
      {
        isToastMessage: true,
        toast: {
          message: message,
          type: type,
          info: '',
          closeText: '',
        },
      },
      () => {
        setTimeout(() => this.closeToast(), 3000)
      },
    )
  }

	render() {
		return (
			<Router>
				<ApolloProvider client={client}>
					<AuthContext.Provider
						value={{
              // scrollTop: this.scrollTop.bind(this),
              // serverRequest: this.state.serverRequest,
              changeTheme: this.changeTheme.bind(this),
              themeDark: this.state.themeDark,
              showAlert: this.showAlert.bind(this),
              changeHeaderColor: this.changeHeaderColor.bind(this),
              headerChange: this.state.isChangeHeaderColor,
            }}
					 > 
						<ScrollToTop>
							<Routes {...this.props} themeDark={this.state.themeDark} isMobile={window.isMobile}/>
						</ScrollToTop>
						{this.state.isToastMessage && (
						<ToastMessage toast={this.state.toast} closeToast={this.closeToast.bind(this)} />
                )}
					</AuthContext.Provider>
				</ApolloProvider>
			</Router>
		);
	}
}
