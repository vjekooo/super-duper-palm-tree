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
	const { data, loading, error } = useAxios(url)

	return (
		<Container>
			<div>{loading ? 'Loading...' : ''}</div>
			{data?.content && <HangMan quote={data?.content as string} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
