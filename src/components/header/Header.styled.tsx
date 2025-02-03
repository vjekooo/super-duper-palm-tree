import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	margin-bottom: 20px;
`

export const UserName = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin-right: auto;
`

export const StyledLink = styled(Link)<{ $isActive: boolean }>`
	font-size: 20px;
	color: ${props => (props.$isActive ? 'blue' : 'gray')};
	text-decoration: ${props => (props.$isActive ? 'underline' : 'none')};
`
