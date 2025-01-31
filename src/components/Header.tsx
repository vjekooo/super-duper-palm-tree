import { Link } from 'react-router-dom'

export const Header: React.FC = () => (
	<header>
		<Link to="/">Hello</Link>
		<Link to="/world">World</Link>
	</header>
)
