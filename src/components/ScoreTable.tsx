import styled from 'styled-components'

interface ScoreEntry {
	id: number
	quoteId: string
	length: number
	uniqueCharacters: number
	userName: string
	errors: number
	duration: number
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

interface Props {
	data: ScoreEntry[]
}

export const ScoreTable = ({ data }: Props) => {
	return (
		<Container>
			<div>
				{data?.map((entry: ScoreEntry) => (
					<div key={entry.quoteId}>{entry.userName}</div>
				))}
			</div>
		</Container>
	)
}
