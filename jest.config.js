module.exports = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['./setup-tests.js'],
	preset: 'ts-jest',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
	},
	rootDir: './'
}
