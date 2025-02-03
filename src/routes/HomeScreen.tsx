import { useRef, useState } from 'react'
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
	padding: 15px 10px;
	max-width: 100px;
	margin-left: 20px;
	color: cadetblue;
`

const Input = styled.input`
	max-width: 300px;
	padding: 15px 10px;
`

export const HomeScreen: React.FC = () => {
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)

	const [name, setName] = useState('')

	const dispatch = useDispatch()

	const submitName = () => {
		if (!name) {
			if (inputRef.current) {
				inputRef.current.focus()
			}
			return
		}

		dispatch(setUserName(name))
		navigate('/game')
	}

	return (
		<Container>
			<label>Name</label>
			<div>
				<Input
					ref={inputRef}
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Please enter your name"
				/>
				<Button onClick={() => submitName()}>Submit</Button>
			</div>
		</Container>
	)
}
