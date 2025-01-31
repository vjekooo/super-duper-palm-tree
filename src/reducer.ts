import { combineReducers } from 'redux'

const initialState = [
	{
		user: {}
	}
]

interface Action {
	type: string
}

function defaultReducer(state = initialState, action: Action) {
	switch (action.type) {
		default:
			return state
	}
}

const rootReducer = combineReducers({ default: defaultReducer })

export default rootReducer
