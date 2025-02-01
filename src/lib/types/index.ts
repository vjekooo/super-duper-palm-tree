export interface Quote {
	quoteId: string
	content: string
	length: number
}

export interface ScoreEntry {
	id: number
	quoteId: string
	length: number
	uniqueCharacters: number
	userName: string
	errors: number
	duration: number
}

export interface Score {
	id: number
	userName: string
	score: number
}

export interface MessageResponse {
	message: string
}
