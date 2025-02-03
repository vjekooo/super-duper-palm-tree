import React, { useState } from 'react'
import styled from 'styled-components'

const Toast = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	background: lavenderblush;
	color: black;
	padding: 10px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export function useToast() {
	const [visible, setVisible] = useState(false)
	const [message, setMessage] = useState('')

	const showToast = (msg: string, duration = 3000) => {
		setMessage(msg)
		setVisible(true)
		setTimeout(() => setVisible(false), duration)
	}

	const ToastComponent = () => (
		<>
			{visible && (
				<Toast>
					<span>{message}</span>
				</Toast>
			)}
		</>
	)
	// decouple UI from hook, this way makes it less reusable
	return { ToastComponent, showToast }
}
