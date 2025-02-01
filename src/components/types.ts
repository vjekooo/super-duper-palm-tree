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
	userName: string
	score: number
}
