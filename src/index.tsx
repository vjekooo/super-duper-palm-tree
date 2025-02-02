import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import App from './App'
import store from './reducer'

const container = document.getElementById('app') as HTMLElement

const root = createRoot(container)
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
