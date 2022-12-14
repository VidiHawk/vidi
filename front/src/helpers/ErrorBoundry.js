import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
	<div className="error-page">
		<div className="error-message">
			<p>
				There is some error during load this section.{' '}
				<a role="button" onClick={() => window.location.reload()}>
					Click here
				</a>{' '}
				to reload again
			</p>
		</div>
	</div>
      )
    }
    return this.props.children
  }
}
