import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTimer } from '../../hooks/useTimer'

import {
	Container,
	FlexBetween,
	HangmanWrapper,
	ResetButton,
	Stack,
	Text
} from './Game.styled'
import { $fetch } from '../../lib/fetch'
import { GameData, MessageResponse, Quote } from '../../lib/types'
import {
	calculateNumberOfUniqueCharacters,
	checkIfWinner,
	generateAlphabetLetters
} from '../../lib/utils'
import { useToast } from '../../hooks/useToast'
import { MaskedQuoteText } from '../maskedQuoteText/MaskedQuoteText'
import { Alphabet } from './Alphabet'
import { HangmanFigure } from './HangmanFigure'

interface Props {
	quote: Quote
	onReset: () => void
}

const MAX_ATTEMPTS = 6
const SECONDS_TO_MILLIS = 1000

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

const sendGameData = async (
	postData: GameData,
	showToast: (msg: string) => void
) => {
	try {
		await $fetch<any, MessageResponse>(url).post(postData)
		showToast('Your score has been saved')
	} catch (error: any) {
		showToast(error?.message || 'Something went wrong')
	}
}

const letters = generateAlphabetLetters()

export const Game = ({ quote, onReset }: Props) => {
	const userName = useSelector((state: any) => state.user.userName)

	const { ToastComponent, showToast } = useToast()

	const [sentence] = useState(quote.content)
	const [guessedLetters, setGuessedLetters] = useState<string[]>([])
	const [wrongGuesses, setWrongGuesses] = useState(0)

	const isWinner = checkIfWinner(sentence, guessedLetters)
	const isLoser = wrongGuesses >= MAX_ATTEMPTS
	const livesLeft = MAX_ATTEMPTS - wrongGuesses

	const gameOver = isWinner || isLoser

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

		sendGameData(postData, showToast).catch(console.error)
	}

	useEffect(() => {
		if (gameOver && isWinner) {
			handleGameOver()
		}
	}, [gameOver])

	return (
		<Container>
			<ToastComponent />
			<HangmanWrapper>
				<HangmanFigure wrongGuesses={wrongGuesses} />
			</HangmanWrapper>
			<FlexBetween>
				<Text>Time elapsed: {timeElapsed} seconds</Text>
				<ResetButton onClick={onReset}>Reset</ResetButton>
			</FlexBetween>
			<MaskedQuoteText base={sentence} revealed={guessedLetters} />
			<Alphabet
				letters={letters}
				guessedLetters={guessedLetters}
				gameOver={gameOver}
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
