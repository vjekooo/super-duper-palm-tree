import { useState, useEffect } from 'react'

interface UseFetch<T> {
	data: T | undefined
	status: 'pending' | 'success'
	error: string | undefined
}

export function useFetch<T>(
	fetchPromiseFn: () => Promise<T | undefined>
): UseFetch<T> {
	const [data, setData] = useState<T | undefined>(undefined)
	const [status, setStatus] = useState<'pending' | 'success'>('pending')
	const [error, setError] = useState<string | undefined>(undefined)

	const fetchData = async () => {
		setStatus('pending')
		setError(undefined)
		try {
			const response = await fetchPromiseFn()
			setData(response)
			setStatus('success')
		} catch (err: any) {
			setError(err.message || 'An error occurred while fetching the data.')
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return { data, status, error }
}
