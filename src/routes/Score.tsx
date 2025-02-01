import styled from 'styled-components'
import { useAxios } from '../hooks/useAxios'

interface ScoreEntry {
	id: number
	quoteId: string
	length: number
	uniqueCharacters: number
	userName: string
	errors: number
	duration: number
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

export const Score: React.FC = () => {
	const { data } = useAxios(url)

	return (
		<Container>
			<div>
				{data?.map((entry: ScoreEntry) => (
					<div key={entry.quoteId}>{entry.userName}</div>
				))}
			</div>
		</Container>
	)
}
