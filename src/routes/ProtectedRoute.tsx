import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const RequireUsername: React.FC<{ children: JSX.Element }> = ({
	children
}) => {
	const userName = useSelector((state: any) => state.game.userName)

	if (!userName) {
		return <Navigate to="/" replace />
	}
	return children
}
