import { useState, useEffect } from 'react'

export const useTimer = (gameOver: boolean) => {
	const [timeElapsed, setTimeElapsed] = useState(0)

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null

		if (!gameOver) {
			timer = setInterval(() => {
				setTimeElapsed(prev => prev + 1)
			}, 1000)
		}

		return () => {
			if (timer) clearInterval(timer)
		}
	}, [gameOver])

	return timeElapsed
}
