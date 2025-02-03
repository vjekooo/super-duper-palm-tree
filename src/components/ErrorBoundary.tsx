import React from 'react'

type ErrorBoundaryProps = {
	children: React.ReactNode
	fallback?: React.ReactNode
}

type ErrorBoundaryState = {
	hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error caught by ErrorBoundary:', error)
		console.error('Error details:', errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback || <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}

export default ErrorBoundary
