import styled from 'styled-components'

interface Props {
	quote?: string
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

export const HangMan: React.FC = ({ quote }: Props) => {
	console.log('quote', quote)
	return (
		<Container>
			<div></div>
		</Container>
	)
}
