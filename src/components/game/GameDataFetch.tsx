import axios from 'axios'
import { useQuote } from '../../hooks/useQuote'
import { Game } from './Game'
import { Text } from './Game.styled'
import { Loader } from '../loader/Loader'
import { PendingWrapper } from '../loader/Loader.style'

const url = 'https://api.quotable.io/random'

const fetchQuote = async () => {
	const response = await axios.get(url)
	return response.data
}

export const GameDataFetch: React.FC = () => {
	const { quoteData, status, error, reFetch } = useQuote(fetchQuote)

	const onReset = () => {
		// reFetch method is a bit of deviation from Bonus 2a task requirement
		// but it is the cleanest way to handle resting in this case
		reFetch()
	}

	return (
		<>
			<PendingWrapper>{status === 'pending' && <Loader />}</PendingWrapper>
			{quoteData && <Game key={quoteData._id} quote={quoteData} onReset={onReset} />}
			<Text>{error ? 'Something went wrong' : ''}</Text>
		</>
	)
}
