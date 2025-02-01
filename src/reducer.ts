import { combineReducers } from 'redux'
import { SET_USER_NAME } from './actions'

export interface UserScore {
	userName: string
	quoteId: number
	length: number
	uniqueCharacters: number
	errors: number
	duration: number
}

interface State {
	game: UserScore
}

const initialState: State = {
	game: {
		userName: '',
		quoteId: 0,
		length: 0,
		uniqueCharacters: 0,
		errors: 0,
		duration: 0
	}
}

interface Action {
	type: string
	payload: string | number
}

function gameReducer(state = initialState, action: Action) {
	switch (action.type) {
		case SET_USER_NAME:
			return {
				...state.game,
				userName: action.payload
			}

		default:
			return state
	}
}

const rootReducer = combineReducers({ game: gameReducer })

export default rootReducer
