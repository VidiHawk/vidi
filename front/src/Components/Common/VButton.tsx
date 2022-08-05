import React from 'react'
import { Button } from 'antd'

const VButton = (props:any) => {
  const { onClick, htmlType = 'button', loading = false } = props
  return (
	<Button className="v-button" onClick={onClick} htmlType={htmlType} loading={loading}>
		{props.children}
	</Button>
  )
}

export default VButton;