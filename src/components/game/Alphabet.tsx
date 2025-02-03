import { Letter, LetterList } from './Game.styled'

interface Props {
	letters: string[]
	guessedLetters: string[]
	onGuess: (letter: string) => void
}

export const Alphabet = ({ letters, guessedLetters, onGuess }: Props) => {
	return (
		<LetterList>
			{letters.map(letter => (
				<Letter
					key={letter}
					$disabled={guessedLetters.includes(letter)}
					onClick={() => onGuess(letter)}
				>
					<span>{letter}</span>
				</Letter>
			))}
		</LetterList>
	)
}
