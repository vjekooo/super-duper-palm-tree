import { Fragment, JSX } from 'react'

interface Props {
	wrongGuesses: number
}

const guessToStickMapper: Record<string, JSX.Element> = {
	1: <circle cx="130" cy="70" r="20" stroke="black" strokeWidth="4" fill="none" />,
	2: <line x1="130" y1="90" x2="130" y2="150" stroke="black" strokeWidth="4" />,
	3: <line x1="130" y1="110" x2="110" y2="140" stroke="black" strokeWidth="4" />,
	4: <line x1="130" y1="110" x2="150" y2="140" stroke="black" strokeWidth="4" />,
	5: <line x1="130" y1="150" x2="110" y2="190" stroke="black" strokeWidth="4" />,
	6: <line x1="130" y1="150" x2="150" y2="190" stroke="black" strokeWidth="4" />
}

export const HangmanFigure = ({ wrongGuesses }: Props) => {
	return (
		<svg
			width="200"
			height="250"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 200 250"
		>
			<line x1="10" y1="230" x2="150" y2="230" stroke="black" strokeWidth="4" />
			<line x1="60" y1="230" x2="60" y2="20" stroke="black" strokeWidth="4" />
			<line x1="60" y1="20" x2="130" y2="20" stroke="black" strokeWidth="4" />
			<line x1="130" y1="20" x2="130" y2="50" stroke="black" strokeWidth="4" />
			{Object.keys(guessToStickMapper)
				.map(Number)
				.filter(key => key <= wrongGuesses)
				.map(key => (
					<Fragment key={key}>{guessToStickMapper[key]}</Fragment>
				))}
		</svg>
	)
}
