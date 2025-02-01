import styled from 'styled-components'
import { calculateScore } from '../lib'

interface ScoreEntry {
	id: number
	quoteId: string
	length: number
	uniqueCharacters: number
	userName: string
	errors: number
	duration: number
}

interface Score {
	userName: string
	score: number
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

interface Props {
	data: ScoreEntry[]
}

const transformToTableData = (data: ScoreEntry[]): Score[] => {
	return data.map((entry: ScoreEntry) => ({
		userName: entry.userName,
		score: calculateScore(
			entry.length,
			entry.uniqueCharacters,
			entry.errors,
			entry.duration
		)
	}))
}

export const ScoreTable = ({ data }: Props) => {
	const tableData = transformToTableData(data).sort((a, b) => b.score - a.score)

	return (
		<Container>
			<div>
				{tableData?.map(entry => (
					<Row key={entry.userName}>
						<div>{entry.userName}</div>
						<div>{entry.score}</div>
					</Row>
				))}
			</div>
		</Container>
	)
}
