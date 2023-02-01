import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { GREYWHITE, LIGHTGREY, shadow600, WHITE, MAINCOLOR } from '../../data/constants'
import Input from "./Input"
import useClickOutside from '../../hooks/useClickOutside'




const Container = styled.div`
position: relative;
background-color: transparent;
height: fit-content;
>.time-picker-button{
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    >svg{
        fill: ${LIGHTGREY};
        *{
            fill: ${LIGHTGREY};
        }
    }
    
}
`

const StyledAutocompleteContainer = styled.div`
background: ${WHITE};
z-index: 2;
width: 100%;
height: fit-content;
position: absolute;
top:105%;
box-shadow:${shadow600};
max-height: 20rem;
overflow: scroll;
background-color: transparent;
border-radius: 0.5rem;
`
const TagContainer = styled.div`
text-align: left;
width: 100%;
display: flex;
align-items: center;
padding-left: 1rem;
background-color: white;
height: 3rem;
cursor: pointer;
position: relative;
:hover{
    background-color: ${GREYWHITE};
}
>img{
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}
&.selected{
    :before{
        content: "";
        position: absolute;
        top: calc(50% - 0.25rem);
        right: 1rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${MAINCOLOR};
    }
}
`


const MultipleOptionSelector = ({options=[], value, setValue, noAddOption, withImage, label, ...props}) => {
    const [relevantOptions, setRelevantOptions] = React.useState([...options])
    const [focus, setFocus] = React.useState(false)
    const [inputValue, setInputValue] = useState("")
    const ref = useRef(null);


    
    useClickOutside(ref.current, () => {
      setFocus(false);
    });





    useEffect(()=>{
        setInputValue(value.toString())
    },[value])




    

   
    return (
            <Container ref={ref}>
            <Input label={label} value={inputValue}   onChange={(e)=>setInputValue(e.target.value)}  onFocusCapture={()=>setFocus(true)} {...props}></Input>
            {focus?<StyledAutocompleteContainer style={{pointerEvents:focus?"all":"none", opacity:focus?"1":"0"}} styledHeight={options.length}>
                {options.map(option => <Tag 
                label={option.label}
                value={option.value}
                setValue={setValue}
                selected={value.includes(option.value)}
                withImage={withImage}
                image={option.image}
                    key={option.label}
                    ></Tag>)}
            </StyledAutocompleteContainer>:null}
            <button className="time-picker-button" onClick={()=>setFocus(previous=>!previous)} color={GREYWHITE} >{focus?"☝️":"👇"}</button>
            </Container>
    )
}

export default MultipleOptionSelector



const Tag = ({label, value, setValue, selected, withImage, image}) => {
    const onClick =()=>{
        if(selected){
            setValue(prev=>prev.filter(val=>val!==value))
        }else{
            setValue(prev=>[...prev, value])
        }
    }

    return (
        <TagContainer className={selected?"selected":""} onClick={()=>onClick(value)}>{withImage?<img src={image}></img>:null}<p>{label}</p></TagContainer>
    )
}