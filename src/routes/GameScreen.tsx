import ErrorBoundary from '../components/ErrorBoundary'
import { GameDataFetch } from '../components/game/GameDataFetch'

export const GameScreen = () => {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<GameDataFetch />
		</ErrorBoundary>
	)
}
