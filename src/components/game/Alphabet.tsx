import { Letter, LetterList } from './Game.styled'

interface Props {
	letters: string[]
	guessedLetters: string[]
	handleGuess: (letter: string) => void
}

export const Alphabet = ({ letters, guessedLetters, handleGuess }: Props) => {
	return (
		<LetterList>
			{letters.map(letter => (
				<Letter
					key={letter}
					$disabled={guessedLetters.includes(letter)}
					onClick={() => handleGuess(letter)}
				>
					<span>{letter}</span>
				</Letter>
			))}
		</LetterList>
	)
}
