import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider, DomainTheme } from 'styled-components'
import { Header } from 'components/Header'
import { Hello, Game, Score } from 'routes'
import { GlobalStyle, themeStyles } from 'lib/style'

const defaultTheme: DomainTheme = {
	background: 'salmon'
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
					<Route path="/" element={<Hello />} />
					<Route path="/game" element={<Game />} />
					<Route path="/score" element={<Score />} />
					<Route element={<div>404</div>} />
				</Routes>
			</BrowserRouter>
		</Wrapper>
		<GlobalStyle />
	</ThemeProvider>
)

export default App
