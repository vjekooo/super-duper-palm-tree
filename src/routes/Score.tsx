import { useAxios } from '../hooks/useAxios'
import { ScoreTable } from '../components/ScoreTable'

const url =
	'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores'

export const Score: React.FC = () => {
	const { data } = useAxios(url)

	return <div>{data && <ScoreTable data={data} />}</div>
}
