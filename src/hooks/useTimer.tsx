import { useState, useEffect } from 'react'

export const useTimer = (isActive: boolean) => {
	const [timeElapsed, setTimeElapsed] = useState(0)

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null

		if (!isActive) {
			timer = setInterval(() => {
				setTimeElapsed(prev => prev + 1)
			}, 1000)
		}

		return () => {
			if (timer) clearInterval(timer)
		}
	}, [isActive])

	return timeElapsed
}
