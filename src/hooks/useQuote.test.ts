import { renderHook, waitFor } from '@testing-library/react'
import { useQuote } from './useQuote'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('useQuote Hook', () => {
	it('handles successful quote fetching and calls console.log in onResolve', async () => {
		const mockResponse = {
			_id: 'Ghsgd',
			content: 'Test quote.',
			length: 45
		}
		mockedAxios.get.mockResolvedValueOnce({ data: mockResponse })

		const quotePromiseFn = () =>
			mockedAxios.get('https://api.quotable.io/random').then(res => res.data)

		const consoleLogSpy = jest.spyOn(console, 'log')

		const { result } = renderHook(() => useQuote(quotePromiseFn))

		await waitFor(() => {
			expect(result.current.status).toBe('success')
			expect(result.current.quoteData).toEqual(mockResponse)
			expect(result.current.error).toBeNull()

			expect(consoleLogSpy).toHaveBeenCalledWith(mockResponse)
			consoleLogSpy.mockRestore()
		})
	})
})
