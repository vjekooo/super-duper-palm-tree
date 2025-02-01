import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider, DomainTheme } from 'styled-components'
import { Header } from 'components/Header'
import { HomeScreen, GameScreen, ScoreScreen } from 'routes'
import { GlobalStyle, themeStyles } from 'lib/style'

const defaultTheme: DomainTheme = {
	background: 'lavender'
}

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 900px;
	padding: 20px 20px;
	${themeStyles};
`

const App: React.FC = (): JSX.Element => (
	<ThemeProvider theme={defaultTheme}>
		<Wrapper>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/game" element={<GameScreen />} />
					<Route path="/score" element={<ScoreScreen />} />
					<Route element={<div>404</div>} />
				</Routes>
			</BrowserRouter>
		</Wrapper>
		<GlobalStyle />
	</ThemeProvider>
)

export default App
