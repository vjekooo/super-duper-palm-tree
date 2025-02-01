import styled from 'styled-components'
import { useAxios } from '../hooks/useAxios'
import { HangMan } from '../components/HangMan'
import { useSelector } from 'react-redux'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const url = 'http://api.quotable.io/random'

export const Game: React.FC = () => {
	const userName = useSelector((state: any) => state.game.userName)

	const { data, loading, error } = useAxios(url)

	return (
		<Container>
			<div>{userName}</div>
			<div>{loading ? 'Loading...' : ''}</div>
			{data?.content && <HangMan quote={data?.content as string} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
