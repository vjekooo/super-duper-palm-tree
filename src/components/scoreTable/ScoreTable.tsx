import { Container, Row } from './Scoretable.styled'
import { calculateScore } from '../../lib/utils'
import { Score, ScoreEntry } from '../../lib/types'

interface Props {
	data: ScoreEntry[]
}

const transformResponseToTableData = (data: ScoreEntry[]): Score[] => {
	return data.map((entry: ScoreEntry) => ({
		id: entry.id,
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
	const tableData = transformResponseToTableData(data).sort(
		(a, b) => b.score - a.score
	)

	return (
		<Container>
			<div>
				{tableData?.map(entry => (
					<Row key={entry.id}>
						<div>{entry.userName}</div>
						<div>{entry.score}</div>
					</Row>
				))}
			</div>
		</Container>
	)
}
