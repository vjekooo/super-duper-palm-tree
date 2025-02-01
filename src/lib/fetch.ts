import axios, { AxiosRequestConfig } from 'axios'

const headers = () => {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

interface Error {
	message: string
}

export interface FetchData<R> {
	data?: R
	error?: Error
}

interface FetchMethods<T, R> {
	get: () => Promise<FetchData<R>>
	post: (body: T) => Promise<FetchData<R>>
}

export const $fetch = <TBody, TResponse>(
	url: string
): FetchMethods<TBody, TResponse> => {
	const axiosConfig: AxiosRequestConfig = {
		url,
		headers: headers()
	}

	return {
		get: async () => {
			try {
				const response = await axios({
					...axiosConfig,
					method: 'GET'
				})
				return { data: response.data }
			} catch (err: any) {
				return {
					error: { message: err.response?.data?.message || err.message }
				}
			}
		},
		post: async body => {
			try {
				const response = await axios({
					...axiosConfig,
					method: 'POST',
					data: body
				})
				return { data: response.data }
			} catch (err: any) {
				return {
					error: {
						message: err.response?.data?.message || err.message
					}
				}
			}
		}
	}
}
