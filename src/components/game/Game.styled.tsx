import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
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
`
