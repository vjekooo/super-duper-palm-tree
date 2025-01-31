import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './App'
import rootReducer from './reducer'

const store = createStore(rootReducer)

const container = document.getElementById('app') as HTMLElement

const root = createRoot(container)
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
