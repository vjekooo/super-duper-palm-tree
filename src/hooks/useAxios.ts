import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export const useAxios = (url: string, options?: AxiosRequestConfig) => {
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axios({ url, ...options })
				setData(response.data)
				setError(null)
			} catch (err: any) {
				setError(err.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, error, loading }
}
