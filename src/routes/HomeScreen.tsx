import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setUserName } from '../actions'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 0 auto;
`

const Button = styled.button`
	padding: 10px;
	max-width: 100px;
	color: cadetblue;
`

const Input = styled.input`
	height: 40px;
	max-width: 300px;
	padding: 3px 10px;
`

export const HomeScreen: React.FC = () => {
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
			<Input
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
