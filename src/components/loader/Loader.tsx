export const Loader = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="50px"
			height="50px"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
		>
			<circle
				cx="50"
				cy="50"
				r="32"
				strokeWidth="8"
				stroke="#6c6cf2"
				strokeDasharray="50.26548245743669 50.26548245743669"
				fill="none"
				strokeLinecap="round"
			>
				<animateTransform
					attributeName="transform"
					type="rotate"
					repeatCount="indefinite"
					dur="1s"
					values="0 50 50;360 50 50"
					keyTimes="0;1"
				/>
			</circle>
		</svg>
	)
}
