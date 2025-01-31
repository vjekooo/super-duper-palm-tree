import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled, { ThemeProvider, DomainTheme } from 'styled-components'
import { Header } from 'components/Header'
import { Hello, World } from 'routes'
import { GlobalStyle, themeStyles } from 'lib/style'

const defaultTheme: DomainTheme = {
	background: 'salmon',
	font: 'Avenir'
}

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 600px;
	padding: 0 10px;
	${themeStyles};
`

const App: React.FC = (): JSX.Element => (
	<ThemeProvider theme={defaultTheme}>
		<Wrapper>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Hello />} />
					<Route path="/world" element={<World />} />
					<Route element={<div>404</div>} />
				</Routes>
			</BrowserRouter>
		</Wrapper>
		<GlobalStyle />
	</ThemeProvider>
)

export default App
