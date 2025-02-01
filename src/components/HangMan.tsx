import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useTimer } from '../hooks/useTimer'

interface Quote {
	quoteId: string
	content: string
	length: number
}

interface Props {
	quote: Quote
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`

const QuoteContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`

const Char = styled.div`
	width: 25px;
	height: 25px;
	margin-bottom: 10px;
	font-size: 20px;
`

const Alphabet = styled.div`
	display: flex;
	gap: 5px;
`

const Letter = styled.div<{ $disabled?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
	width: 35px;
	height: 35px;
	background: ${props => (props.$disabled ? 'salmon' : '#ccc')};
	color: ${props => (props.$disabled ? '#000' : 'white')};
`

const letters = Array.from({ length: 26 }, (_, i) =>
	String.fromCharCode(97 + i)
)

const calculateUniqueCharacters = (sentence: string) => {
	const transformedSentence = sentence.toLowerCase().replace(/[^a-z]/g, '')
	const uniqueCharacters = new Set(transformedSentence.split(''))
	return uniqueCharacters.size
}

const MAX_ATTEMPTS = 6

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

export const HangMan = ({ quote }: Props) => {
	const userName = useSelector((state: any) => state.game.userName)

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

	const getDisplaySentence = () => {
		return sentence?.split('').map(char => {
			if (char === ' ') {
				return ' '
			} else if (!/[a-zA-Z]/.test(char)) {
				return ` ${char} `
			} else {
				return guessedLetters.includes(char) ? ` ${char} ` : '_'
			}
		})
	}

	const displaySentence = getDisplaySentence()

	const isWinner = quote.content
		?.split('')
		.every(
			char =>
				char === ' ' || !/[a-zA-Z]/.test(char) || guessedLetters.includes(char)
		)

	const isLoser = wrongGuesses >= MAX_ATTEMPTS

	useEffect(() => {
		if (isWinner || isLoser) {
			setGameOver(true)
		}
	}, [isWinner, isLoser])

	useEffect(() => {
		if (gameOver) {
			const postData = {
				quoteId: quote.quoteId,
				length: quote.length,
				uniqueCharacters: calculateUniqueCharacters(sentence),
				userName,
				errors: wrongGuesses,
				duration: timeElapsed * 1000
			}
			axios
				.post(url, postData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(response => {
					console.log('Success:', response.data)
				})
				.catch(error => {
					console.error('Error posting data:', error)
				})
		}
	}, [gameOver])

	return (
		<Container>
			<div>Time elapsed: {timeElapsed} seconds</div>
			<QuoteContainer>
				{displaySentence.map((char, i) => (
					<Char key={i}>{char}</Char>
				))}
			</QuoteContainer>
			<Alphabet>
				{letters.map(letter => (
					<Letter
						key={letter}
						$disabled={guessedLetters.includes(letter)}
						onClick={() => handleGuess(letter)}
					>
						<span>{letter}</span>
					</Letter>
				))}
			</Alphabet>
			<div>You have: {MAX_ATTEMPTS - wrongGuesses} lives left</div>
			<div>{isWinner ? 'Your win' : ''}</div>
			<div>{isLoser ? 'Your lose' : ''}</div>
		</Container>
	)
}
