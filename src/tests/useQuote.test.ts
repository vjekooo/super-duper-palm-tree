import { act, renderHook, waitFor } from '@testing-library/react'
import { useQuote } from '../hooks/useQuote'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useQuote Hook', () => {
	it('should successfully fetch a quote and call onResolve', async () => {
		const mockQuote = {
			_id: 'Ghsgd',
			content: 'Test quote.',
			length: 45
		}
		mockedAxios.get.mockResolvedValueOnce({ data: mockQuote })

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const consoleLogSpy = jest.spyOn(console, 'log')

		const { result } = renderHook(() => useQuote(quotePromiseFn))

		await waitFor(() => {
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toEqual(mockQuote)
			expect(result.current.error).toBeNull()

			expect(consoleLogSpy).toHaveBeenCalledWith(mockQuote)
			consoleLogSpy.mockRestore()
		})
	})

	it('should call OnReject when an error occurs', async () => {
		const mockError = new Error('Network error')
		mockedAxios.get.mockRejectedValueOnce(mockError)

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const consoleLogSpy = jest.spyOn(console, 'log')

		const { result } = renderHook(() => useQuote(quotePromiseFn))

		await waitFor(() => {
			expect(result.current.status).toBe('error')
			expect(result.current.quoteData).toBeNull()
			expect(result.current.error).toEqual(mockError.message)

			expect(consoleLogSpy).toHaveBeenCalledWith(mockError)
			consoleLogSpy.mockRestore()
		})
	})

	it('should successfully fetch a quote and change status from pending to success', async () => {
		const mockQuote = {
			_id: 'Ghsgd',
			content: 'Test quote.',
			length: 8
		}
		mockedAxios.get.mockResolvedValueOnce({ data: mockQuote })

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const { result } = renderHook(() => useQuote(quotePromiseFn))

		expect(result.current.status).toBe('pending')
		expect(result.current.quoteData).toBeNull()
		expect(result.current.error).toBeNull()

		await waitFor(() => {
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toEqual(mockQuote)
			expect(result.current.error).toBeNull()
		})
	})

	it('should update quoteData when reFetch is called', async () => {
		const mockQuotePromiseFn = jest.fn()

		const mockQuote = {
			_id: 'ApPgd',
			content: 'Test quote for reFetch.',
			length: 45
		}
		mockQuotePromiseFn.mockResolvedValueOnce(mockQuote)

		const { result } = renderHook(() => useQuote(mockQuotePromiseFn))

		expect(result.current.status).toBe('pending')
		expect(result.current.quoteData).toBeNull()

		await act(async () => {
			await mockQuotePromiseFn
		})

		expect(result.current.status).toBe('success')
		expect(result.current.quoteData).toEqual(mockQuote)

		const newQuote = {
			_id: 'LLigd',
			content: 'New quote for reFetch.',
			length: 20
		}
		mockQuotePromiseFn.mockResolvedValueOnce(newQuote)

		await act(async () => {
			result.current.reFetch()
		})

		expect(result.current.status).toBe('success')
		expect(result.current.quoteData).toEqual(newQuote)
		expect(mockQuotePromiseFn).toHaveBeenCalledTimes(2)
	})
})
