import axios from 'axios'
import { useQuote } from '../../hooks/useQuote'
import { Game } from './Game'

const url = 'https://api.quotable.io/random'

const fetchQuote = async () => {
	const response = await axios.get(url)
	return response.data
}

export const GameDataFetch: React.FC = () => {
	const { quoteData, status, error } = useQuote(fetchQuote)

	return (
		<>
			<div>{status === 'pending' ? 'Loading...' : ''}</div>
			{quoteData && <Game quote={quoteData} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</>
	)
}
