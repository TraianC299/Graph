import React, { useEffect, useState } from 'react'
import { useGraph } from '../../contexts/GraphContext.context'
import Input from '../input/Input'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import OptionSelector from '../input/OptionSelector'
import MultipleOptionSelector from '../input/MultipleSelector'



const getNewArray = (nrDeVarfuri) => {

    if(Math.sign(nrDeVarfuri)===-1 || typeof nrDeVarfuri !=="number") return new Array(1).fill(0)
    const newArray = new Array(Number(nrDeVarfuri<0? 1:nrDeVarfuri)).fill(0)
    return newArray
}
const ListaInputMethod = () => {
    const {data, setData} = useGraph() 
   


  return (
    getNewArray(data.nrDeVarfuri).map((_,i)=>{
        return(
            <SpecialInput key={i} count={i+1}></SpecialInput>

        )
    })
 
  )
}

export default ListaInputMethod



const SpecialInput = ({count}) => {
    const {data, setData} = useGraph()
    const [value, setValue] = useState(data.listaAdiacenta[count] || [])

    useDidMountEffect(()=>{
        setData(prev=>({...prev, listaAdiacenta:{
            ...prev.listaAdiacenta,
            [count]:value
        }}))
    },[value])


    return(
        <MultipleOptionSelector label={`Varful ${count}`} 
        value={value}
        setValue={setValue}
          options={
            [...new Array(data.nrDeVarfuri)].map((_,i)=>({label:i+1, value:i+1}))
        }></MultipleOptionSelector>
    )
}





 