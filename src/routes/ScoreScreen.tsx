import { ScoreTable } from '../components/scoreTable/ScoreTable'
import styled from 'styled-components'
import { useFetch } from '../hooks/useFetch'
import { $fetch } from '../lib/fetch'
import { ScoreEntry } from '../lib/types'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

const fetchData = async () => {
	const response = await $fetch<any, ScoreEntry[]>(url).get()
	return response.data
}

export const ScoreScreen: React.FC = () => {
	const { data, status, error } = useFetch<ScoreEntry[]>(fetchData)

	return (
		<Container>
			<h1>HIGH SCORES</h1>
			<div>{status === 'pending' ? 'Loading...' : ''}</div>
			{data && <ScoreTable data={data} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
