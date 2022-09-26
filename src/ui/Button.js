import React from 'react'
import { StyledButton } from '../styles/Button.styled'

function Button(props) {
  return (
    <StyledButton value={props.value} onClick={props.onClick} type={props.type ? `${props.type}` : 'button'}>
      {props.children}
    </StyledButton>
  )
}

export default Button
