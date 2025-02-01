import { useState, useEffect, useCallback } from 'react'

interface UseQuote<T> {
	quoteData: T
	status: 'pending' | 'success' | 'error'
	error: string | null
	onResolve: (data: any) => void
	onReject: (error: any) => void
}

export function useQuote<T>(quotePromiseFn: () => Promise<any>): UseQuote<T> {
	const [quoteData, setQuoteData] = useState<any>(null)
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
			setStatus('success')
			onReject(response)
		} catch (err: any) {
			setError(err.message || 'An error occurred while fetching the quote.')
			setStatus('error')
			onReject(err)
		}
	}, [quotePromiseFn])

	useEffect(() => {
		fetchQuote()
	}, [fetchQuote])

	const onResolve = (data: any) => {
		console.log(data)
	}

	const onReject = (error: any) => {
		console.log(error)
	}

	return { quoteData, status, error, onResolve, onReject }
}
