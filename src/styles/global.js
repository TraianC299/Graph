import styled from "styled-components";
import {  coloredShadow, device, GREYWHITE, LIGHTGREY, MAINCOLOR, WHITE } from "../data/constants";

export const InputStyle = styled.input`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.25rem;
  font-size: 1rem;
  padding: 1rem ;
  background: ${GREYWHITE};
  border:none;
  position: relative;
  line-height: 1rem;
  outline: none;
  ::placeholder{
    color: #9CA9B4;
    font-weight: 500;
  }
 `
export const Table = styled.table`
border-collapse: collapse;
width: 100%;
>tr{
    >th{
        border: 1px solid black;
        padding: 0.5rem;
        }
        >td{
            border: 1px solid black;
            padding: 0.5rem;
            }
            }
            `


export const Button = styled.button`
padding: 0.5rem 1rem;
background-color: ${MAINCOLOR};
color: white;
border: none;
border-radius: 5px;
font-size: 1rem;
font-weight: 600;
min-height: 42px;
cursor: pointer;
transition:   all 0.3s ease-in-out;
box-shadow: ${coloredShadow};


&.small{
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;

}
&.ghost{
  border: 1px solid ${MAINCOLOR};
  background-color: transparent;
  color: ${MAINCOLOR};
  box-shadow: none;
}
&.text{
  border: none;
  background-color: transparent;
  color: ${MAINCOLOR};
  box-shadow: none;
  padding-left:0;
}

:disabled{
  background-color: ${LIGHTGREY};
  color: ${WHITE};
  cursor: not-allowed;
  box-shadow: none;
  
}
@media ${device.tabletSmallPortrait}{
  padding: 1.2rem 2rem;
}
@media ${device.laptopSmall}{
    padding: 1rem 2rem;

  :hover{
    transform: scale(1.1);
}
}


`
