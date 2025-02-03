import axios from 'axios'
import { useQuote } from '../../hooks/useQuote'
import { Game } from './Game'
import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const url = 'http://api.quotable.io/random'

const fetchQuote = async () => {
	const response = await axios.get(url)
	return response.data
}

export const GameDataFetch: React.FC = () => {
	const { quoteData, status, error } = useQuote(fetchQuote)

	return (
		<Container>
			<div>{status === 'pending' ? 'Loading...' : ''}</div>
			{quoteData && <Game quote={quoteData} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
