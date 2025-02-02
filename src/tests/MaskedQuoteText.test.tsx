import React from 'react'
import { render, screen } from '@testing-library/react'
import { MaskedQuoteText } from '../components/maskedQuoteText/MaskedQuoteText'

describe('MaskedQuoteText', () => {
	it('renders properly with the given props', () => {
		const base = 'Test Quote'
		const revealed = ['T', 'Q', 'o']

		render(<MaskedQuoteText base={base} revealed={revealed} />)

		expect(screen.getByText('T')).toBeInTheDocument()
		expect(screen.getByText('Q')).toBeInTheDocument()
		expect(screen.getByText('o')).toBeInTheDocument()

		jest.resetAllMocks()
	})
})
