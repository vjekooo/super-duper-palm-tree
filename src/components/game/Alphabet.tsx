import { Letter, LetterList } from './Game.styled'

interface Props {
	letters: string[]
	guessedLetters: string[]
	gameOver: boolean
	onGuess: (letter: string) => void
}

export const Alphabet = ({ letters, guessedLetters, gameOver, onGuess }: Props) => {
	return (
		<LetterList>
			{letters.map(letter => (
				<Letter
					key={letter}
					$disabled={guessedLetters.includes(letter) || gameOver}
					onClick={() => onGuess(letter)}
				>
					<span>{letter}</span>
				</Letter>
			))}
		</LetterList>
	)
}
