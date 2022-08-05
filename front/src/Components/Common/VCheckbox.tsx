import React from 'react'
import { Checkbox } from 'antd'

const VCheckbox = (props:any) => {
  const { onChange } = props
  const themeDark = true;

  return (
	<Checkbox onChange={onChange} className={`v-checkbox ${!themeDark ? 'v-checkbox--light' : ''}`}>
		{props.children}
	</Checkbox>
  )
}

export default VCheckbox;