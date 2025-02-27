import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
`

export const Stack = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const LetterList = styled.div`
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	gap: 5px;
`

export const Letter = styled.div<{ $disabled?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
	width: 35px;
	height: 35px;
	background: ${props => (props.$disabled ? 'salmon' : '#ccc')};
	color: ${props => (props.$disabled ? '#000' : 'white')};
	cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
`

export const Text = styled.p`
	font-size: 18px;
	margin: 0;
`

export const FlexBetween = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export const ResetButton = styled.button`
	padding: 10px;
	background: salmon;
	color: white;
	border: none;
	cursor: pointer;
`

export const HangmanWrapper = styled.div`
	text-align: center;
`
