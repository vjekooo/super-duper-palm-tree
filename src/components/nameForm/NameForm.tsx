import { useNavigate } from 'react-router-dom'
import { setUserName } from '../../actions'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Container, Input } from './NameForm.styled'

export const NameForm: React.FC = () => {
	const navigate = useNavigate()
	const inputRef = useRef<HTMLInputElement>(null)

	const [name, setName] = useState('')

	const dispatch = useDispatch()

	const submitName = (e: React.FormEvent) => {
		e.preventDefault()
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
			<form onSubmit={submitName}>
				<Input
					ref={inputRef}
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Please enter your name"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Container>
	)
}
