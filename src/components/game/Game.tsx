import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTimer } from '../../hooks/useTimer'

import { Container, Stack, Text } from './Game.styled'
import { $fetch } from '../../lib/fetch'
import { MessageResponse, Quote } from '../../lib/types'
import {
	calculateNumberOfUniqueCharacters,
	checkIfWinner,
	generateAlphabetLetters
} from '../../lib/utils'
import { useToast } from '../../hooks/useToast'
import { MaskedQuoteText } from '../maskedQuoteText/MaskedQuoteText'
import { Alphabet } from './Alphabet'

interface Props {
	quote: Quote
}

const MAX_ATTEMPTS = 6
const SECONDS_TO_MILLIS = 1000

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

const sendGameData = async (postData: any) => {
	const { data } = await $fetch<any, MessageResponse>(url).post(postData)
	return data
}

const letters = generateAlphabetLetters()

export const Game = ({ quote }: Props) => {
	const userName = useSelector((state: any) => state.user.userName)

	const { ToastComponent, showToast } = useToast()

	const [sentence] = useState(quote.content)
	const [guessedLetters, setGuessedLetters] = useState<string[]>([])
	const [wrongGuesses, setWrongGuesses] = useState(0)

	const isWinner = checkIfWinner(sentence, guessedLetters)
	const isLoser = wrongGuesses >= MAX_ATTEMPTS
	const livesLeft = MAX_ATTEMPTS - wrongGuesses

	const gameOver = !isWinner || !isLoser

	const timeElapsed = useTimer(gameOver)

	const onGuess = (letter: string) => {
		const lowerCaseLetter = letter.toLowerCase()
		const upperCaseLetter = letter.toUpperCase()

		setGuessedLetters(prev => [...prev, lowerCaseLetter, upperCaseLetter])

		if (!sentence?.toLowerCase().includes(lowerCaseLetter)) {
			setWrongGuesses(prev => prev + 1)
		}
	}

	const handleGameOver = () => {
		const postData = {
			quoteId: quote._id,
			length: quote.length,
			uniqueCharacters: calculateNumberOfUniqueCharacters(sentence),
			userName,
			errors: wrongGuesses,
			duration: timeElapsed * SECONDS_TO_MILLIS
		}

		sendGameData(postData)
			.then(() => {
				showToast('Your score has been saved')
			})
			.catch(error => {
				showToast(error.message || 'Something went wrong')
			})
	}

	useEffect(() => {
		if (gameOver) {
			handleGameOver()
		}
	}, [gameOver])

	return (
		<Container>
			<ToastComponent />
			<Text>Time elapsed: {timeElapsed} seconds</Text>
			<MaskedQuoteText base={sentence} revealed={guessedLetters} />
			<Alphabet
				letters={letters}
				guessedLetters={guessedLetters}
				onGuess={onGuess}
			/>
			<Stack>
				<Text>You have: {livesLeft} lives left</Text>
				{isWinner && <Text>You won!</Text>}
				{isLoser && <Text>You lost!</Text>}
			</Stack>
		</Container>
	)
}
