import { $fetch } from '../../lib/fetch'
import { ScoreEntry } from '../../lib/types'
import { ScoreTable } from './ScoreTable'
import { useFetch } from '../../hooks/useFetch'
import { Container } from './Scoretable.styled'
import { Loader } from '../loader/Loader'
import { PendingWrapper } from '../loader/Loader.style'

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
			<PendingWrapper>{status === 'pending' && <Loader />}</PendingWrapper>
			{data && <ScoreTable data={data} />}
			<div>{error ? 'Something went wrong' : ''}</div>
		</Container>
	)
}
