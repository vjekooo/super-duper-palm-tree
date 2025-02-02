import styled from 'styled-components'
import { Game } from '../components/game/Game'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useQuote } from '../hooks/useQuote'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

interface Quote {
	_id: string
	content: string
	length: number
}

const url = 'http://api.quotable.io/random'

const fetchQuote = async () => {
	const response = await axios.get(url)
	return response.data
}

export const GameScreen: React.FC = () => {
	const userName = useSelector((state: any) => state.game.userName)

	const { quoteData, status, error } = useQuote<Quote>(fetchQuote)

	const quote = {
		quoteId: 'Akjs',
		content: quoteData?.content,
		length: quoteData?.length
	}

	return (
		<Container>
			<div>{userName}</div>
			<div>{status === 'pending' && 'Loading...'}</div>
			{status === 'success' && <Game quote={quote} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
