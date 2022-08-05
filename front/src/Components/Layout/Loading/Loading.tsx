import React from 'react'
import './LoadingCss.scss'

const Loading = (props:any) => {
  return (
	<div className="loading" >
		<div className="spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
  )
}

export default Loading
