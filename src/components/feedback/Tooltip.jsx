import React from 'react'
import styled from 'styled-components'


const TooltipContainerStyle = styled.div`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    background-color: black;
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;

`
const Tooltip = ({message, x, y}) => {
  return (
    <TooltipContainerStyle>
        {message}
    </TooltipContainerStyle>

  )
}

export default Tooltip