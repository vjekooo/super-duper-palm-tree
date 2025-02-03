import { NameForm } from '../components/nameForm/NameForm'
import ErrorBoundary from '../components/ErrorBoundary'

export const HomeScreen: React.FC = () => {
	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<NameForm />
		</ErrorBoundary>
	)
}
