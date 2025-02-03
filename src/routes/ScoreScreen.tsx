import { ScoreDataFetch } from '../components/scoreTable/ScoreDataFetch'
import ErrorBoundary from '../components/ErrorBoundary'

export const ScoreScreen: React.FC = () => {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<ScoreDataFetch />
		</ErrorBoundary>
	)
}
