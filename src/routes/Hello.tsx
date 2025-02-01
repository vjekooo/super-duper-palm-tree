import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setUserName } from '../actions'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin: 0 auto;
`

const Button = styled.button`
	padding: 10px;
	max-width: 100px;
	color: cadetblue;
`

export const Hello: React.FC = () => {
	const navigate = useNavigate()
	const [name, setName] = useState('')

	const dispatch = useDispatch()

	const submitName = () => {
		dispatch(setUserName(name))
		navigate('/game')
	}

	return (
		<Container>
			<label>Name</label>
			<input
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder="Please enter your name"
			/>
			<Button onClick={() => submitName()} disabled={!name}>
				Submit
			</Button>
		</Container>
	)
}
