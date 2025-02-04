import React from 'react'
import { render, screen } from '@testing-library/react'
import { MaskedQuoteText } from '../components/maskedQuoteText/MaskedQuoteText'

describe('MaskedQuoteText', () => {
	it('renders properly with the given props', () => {
		const base = 'Test; Quote!'
		const revealed = ['T', 'Q', 'o']

		render(<MaskedQuoteText base={base} revealed={revealed} />)

		expect(screen.queryByText('T')).toBeInTheDocument()
		expect(screen.queryByText('Q')).toBeInTheDocument()
		expect(screen.queryByText('o')).toBeInTheDocument()
		expect(screen.queryByText('!')).toBeInTheDocument()

		const semicolonElement = screen.queryByText(';')
		const nextElement = semicolonElement?.nextElementSibling

		expect(nextElement).toBeTruthy()
		expect(nextElement?.nodeName).toBe('DIV')
		expect(nextElement).toHaveTextContent('')

		expect(screen.queryByText('e')).not.toBeInTheDocument()
		expect(screen.queryByText('s')).not.toBeInTheDocument()
		expect(screen.queryByText('t')).not.toBeInTheDocument()
		expect(screen.queryByText('u')).not.toBeInTheDocument()
		expect(screen.queryByText('t')).not.toBeInTheDocument()

		const underscores = screen.queryAllByText('_')
		expect(underscores.length).toEqual(6)

		jest.resetAllMocks()
	})
})
