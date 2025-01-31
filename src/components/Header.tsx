import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	gap: 5px;
	margin-bottom: 20px;
`

export const Header: React.FC = () => (
	<Container>
		<Link to="/">Home</Link>
		<Link to="/game">Game</Link>
	</Container>
)
