import React from 'react';

const ToastMessage = (props:any) => {
  const type = typeof props.toast.type !== 'undefined' ? props.toast.type : 'success';
  return(
	<div className={`toast ${type} visible`}>
		<div className="toast-content">
			<p className="toast-message">{ props.toast.message }</p>
			{typeof props.toast.info!== 'undefined' && <p className="toast-info">{ props.toast.info }</p>}
		</div>
		{typeof props.toast.closeText!== 'undefined' && 
		<div className="close-icon" onClick={()=>props.closeToast()}>
			{props.toast.closeText}
		</div>
      }
	</div>
  )
}

export default ToastMessage;