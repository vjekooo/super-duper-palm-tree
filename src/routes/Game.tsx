import styled from 'styled-components'
import { useAxios } from '../hooks/useAxios'
import { HangMan } from '../components/HangMan'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const url = 'http://api.quotable.io/random'

export const Game: React.FC = () => {
	const { data } = useAxios(url)

	return (
		<Container>
			<div>Game</div>
			{data?.content && <HangMan quote={data?.content as string} />}
		</Container>
	)
}
