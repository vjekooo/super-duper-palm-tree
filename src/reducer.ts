import { combineReducers, createStore } from 'redux'
import { SET_USER_NAME } from './actions'

type User = {
	userName: string
}

interface State {
	user: User
}

const initialState: State = {
	user: {
		userName: ''
	}
}

interface Action {
	type: string
	payload: string
}

function userReducer(state = initialState, action: Action) {
	switch (action.type) {
		case SET_USER_NAME:
			return {
				...state.user,
				userName: action.payload
			}

		default:
			return state
	}
}

const rootReducer = combineReducers({ user: userReducer })
const store = createStore(rootReducer)

export default store
