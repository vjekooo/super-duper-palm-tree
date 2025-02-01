import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 50px;
`

export const Header: React.FC = () => (
	<Container>
		<Link to="/">Home</Link>
		<Link to="/game">Game</Link>
		<Link to="/score">Score</Link>
	</Container>
)
