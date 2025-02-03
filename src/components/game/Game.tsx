import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTimer } from '../../hooks/useTimer'

import { Container } from './Game.styled'
import { $fetch } from '../../lib/fetch'
import { MessageResponse, Quote } from '../../lib/types'
import {
	calculateNumberOfUniqueCharacters,
	generateAlphabetLetters
} from '../../lib/utils'
import { useToast } from '../../hooks/useToast'
import { MaskedQuoteText } from '../maskedQuoteText/MaskedQuoteText'
import { Alphabet } from './Alphabet'

interface Props {
	quote: Quote
}

const MAX_ATTEMPTS = 6

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
	const [gameOver, setGameOver] = useState(false)

	const timeElapsed = useTimer(gameOver)

	const handleGuess = (letter: string) => {
		const lowerCaseLetter = letter.toLowerCase()
		const upperCaseLetter = letter.toUpperCase()

		setGuessedLetters(prev => [...prev, lowerCaseLetter, upperCaseLetter])

		if (!sentence?.toLowerCase().includes(lowerCaseLetter)) {
			setWrongGuesses(prev => prev + 1)
		}
	}

	const isWinner = sentence
		?.split('')
		.every(
			char => char === ' ' || !/[a-zA-Z]/.test(char) || guessedLetters.includes(char)
		)

	const isLoser = wrongGuesses >= MAX_ATTEMPTS

	const livesLeft = MAX_ATTEMPTS - wrongGuesses

	useEffect(() => {
		if (isWinner || isLoser) {
			setGameOver(true)
		}
	}, [isWinner, isLoser])

	useEffect(() => {
		if (gameOver) {
			const postData = {
				quoteId: quote._id,
				length: quote.length,
				uniqueCharacters: calculateNumberOfUniqueCharacters(sentence),
				userName,
				errors: wrongGuesses,
				duration: timeElapsed * 1000
			}
			sendGameData(postData)
				.then(() => {
					showToast('Your score has been saved')
				})
				.catch(error => {
					showToast(error.message || 'Something went wrong')
				})
		}
	}, [gameOver])

	return (
		<Container>
			<ToastComponent />
			<div>Time elapsed: {timeElapsed} seconds</div>
			<MaskedQuoteText base={sentence} revealed={guessedLetters} />
			<Alphabet
				letters={letters}
				guessedLetters={guessedLetters}
				handleGuess={handleGuess}
			/>
			<div>You have: {livesLeft} lives left</div>
			<div>{isWinner ? 'Your win' : ''}</div>
			<div>{isLoser ? 'Your lose' : ''}</div>
		</Container>
	)
}
