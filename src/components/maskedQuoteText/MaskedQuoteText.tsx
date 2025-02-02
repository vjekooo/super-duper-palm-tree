import { Char, Container, QuoteContainer } from './MaskedQuoteText.styled'
import { transformQuoteForDisplay } from '../../lib/utils'

interface Props {
	base: string
	revealed: string[]
}

export const MaskedQuoteText = ({ base, revealed }: Props) => {
	const displaySentence = transformQuoteForDisplay(base, revealed)

	return (
		<Container>
			<QuoteContainer>
				{displaySentence.map((char, i) => (
					<Char key={i}>{char}</Char>
				))}
			</QuoteContainer>
		</Container>
	)
}
