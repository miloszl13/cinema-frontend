import React from 'react'
import { StyledCard } from '../styles/Card.styled'

function Card(props) {
  return (
    <StyledCard onClick={props.onClick}>
      {props.children}
    </StyledCard>
  )
}

export default Card
