import { $fetch } from '../../lib/fetch'
import { ScoreEntry } from '../../lib/types'
import { ScoreTable } from './ScoreTable'
import { useFetch } from '../../hooks/useFetch'
import { Container } from './Scoretable.styled'

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

const fetchData = async () => {
	const response = await $fetch<any, ScoreEntry[]>(url).get()
	return response.data
}

export const ScoreDataFetch = () => {
	const { data, status, error } = useFetch<ScoreEntry[]>(fetchData)
	return (
		<Container>
			<h1>High Scores</h1>
			<div>{status === 'pending' ? 'Loading...' : ''}</div>
			{data && <ScoreTable data={data} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
