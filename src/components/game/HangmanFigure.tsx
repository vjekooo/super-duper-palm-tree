import React from 'react'
import styled from 'styled-components'
import { HangmanSVG } from './HangmanSvg'

interface Props {
	wrongGuesses: number
}

const HangmanWrapper = styled.div`
	text-align: center;
`

export const HangmanFigure = ({ wrongGuesses }: Props) => {
	return (
		<HangmanWrapper>
			<HangmanSVG wrongGuesses={wrongGuesses} />
		</HangmanWrapper>
	)
}
