import { useState, useEffect } from 'react'
import { Quote } from '../lib/types'

interface UseQuote {
	quoteData: Quote | null
	status: 'pending' | 'success' | 'error'
	error: string | null
	reFetch: () => void
	onResolve: (data: any) => void
	onReject: (error: any) => void
}

export function useQuote(quotePromiseFn: () => Promise<Quote>): UseQuote {
	const [quoteData, setQuoteData] = useState<Quote | null>(null)
	const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')
	const [error, setError] = useState<string | null>(null)

	const fetchQuote = async () => {
		setStatus('pending')
		setError(null)
		try {
			const response = await quotePromiseFn()
			setQuoteData(response)
			setStatus('success')
			onResolve(response)
		} catch (err: any) {
			setError(err.message || 'An error occurred while fetching the quote.')
			setStatus('error')
			onReject(err)
		}
	}

	useEffect(() => {
		fetchQuote()
	}, [quotePromiseFn])

	const onResolve = (data: Quote) => {
		console.log(data)
	}

	const onReject = (error: any) => {
		console.log(error)
	}

	return { quoteData, status, error, reFetch: fetchQuote, onResolve, onReject }
}
