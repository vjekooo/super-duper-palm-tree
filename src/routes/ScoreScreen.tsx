import { useAxios } from '../hooks/useAxios'
import { ScoreTable } from '../components/scoreTable/ScoreTable'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

export const ScoreScreen: React.FC = () => {
	const userName = useSelector((state: any) => state.game.userName)
	const { data, loading } = useAxios(url)

	return (
		<Container>
			<div>{userName}</div>
			<div>{loading ? 'Loading...' : ''}</div>
			{data && <ScoreTable data={data} />}
		</Container>
	)
}
