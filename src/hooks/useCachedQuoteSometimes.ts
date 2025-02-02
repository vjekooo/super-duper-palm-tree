import { useState, useEffect, useCallback } from 'react'
import { Quote } from '../lib/types'
import {
	getRandomQuoteFromLocalStorage,
	setQuoteToLocalStorage
} from '../lib/utils'

interface UseCachedQuote {
	quoteData: Quote | null
	status: 'pending' | 'success' | 'error'
	error: string | null
	onResolve: (data: any) => void
	onReject: (error: any) => void
}

const cacheKey = 'quote'

export function useCachedQuoteSometimes<T>(
	quotePromiseFn: () => Promise<Quote>
): UseCachedQuote {
	const [quoteData, setQuoteData] = useState<Quote | null>(null)
	const [status, setStatus] = useState<'pending' | 'success' | 'error'>(
		'pending'
	)
	const [error, setError] = useState<string | null>(null)

	const fetchQuote = useCallback(async () => {
		setStatus('pending')
		setError(null)

		try {
			const response = await quotePromiseFn()
			setQuoteData(response)
			setQuoteToLocalStorage(cacheKey, response)
			setStatus('success')
			onResolve(response)
		} catch (err: any) {
			setError(err?.message || 'An error occurred while fetching the quote.')
			setStatus('error')
			const cachedData = localStorage.getItem(cacheKey)
			if (cachedData) {
				const randomQuote = getRandomQuoteFromLocalStorage(cacheKey)
				setQuoteData(randomQuote)
				setStatus('success')
			} else {
				onReject(err)
			}
		}
	}, [quotePromiseFn, cacheKey])

	useEffect(() => {
		const cachedData = localStorage.getItem(cacheKey)
		if (cachedData) {
			setQuoteData(JSON.parse(cachedData))
			setStatus('success')
		} else {
			fetchQuote()
		}
	}, [fetchQuote, cacheKey])

	const onResolve = (data: Quote) => {
		console.log(data)
	}

	const onReject = (error: any) => {
		console.log(error)
	}

	return { quoteData, status, error, onResolve, onReject }
}
