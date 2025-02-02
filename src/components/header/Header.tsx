import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, StyledLink, UserName } from './Header.styled'

const links = [
	{ name: 'Home', path: '/' },
	{ name: 'Game', path: '/game' },
	{ name: 'Score', path: '/score' }
]

export const Header = () => {
	const location = useLocation()
	const userName = useSelector((state: any) => state.user.userName)

	return (
		<Container>
			<Container>
				{links.map(link => {
					const isActive = location.pathname === link.path

					return (
						<StyledLink key={link.name} to={link.path} $isActive={isActive}>
							{link.name}
						</StyledLink>
					)
				})}
			</Container>
			<UserName>{userName}</UserName>
		</Container>
	)
}
