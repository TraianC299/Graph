import React, { useState } from 'react'
import OptionSelector from './input/OptionSelector';

import ListaInputMethod from './GraphInputMethods/Lista';
import MatriceAdiacenta from './GraphInputMethods/MatriceAdiacenta';
import MatriceIncidenta from './GraphInputMethods/MatriceIncidenta';
import WeightInputComponent from './WeightInputMethods/WeightMatriceAdiacenta.Component';
import BellmanFordAlg from './BellmanFordAlg.Component';
import styled from 'styled-components';
import RadioButtons from './input/RadioButtons';
import { useGraph } from '../contexts/GraphContext.context';

const Container  = styled.div`
padding: 2rem;
`
const GraphForm = () => {
    const {data, setData} = useGraph()

    const [addWeights, setAddWeights] = useState(false)
  return (
    <Container className='flex column gap2'>
    <h1 className='h3'>Input graph</h1>
    <OptionSelector 
    options={[...new Array(10)].map((_,i)=>({label:i+1, value:i+1}))}
    value={data.nrDeVarfuri} 
    setValue={(v)=>{
    setData(prev=>({...prev, nrDeVarfuri:v}))
  }} label="nr de varfuri" ></OptionSelector>
    <RadioButtons selected={data.inputOption} 
    setSelected={(v)=>{
      setData(prev=>({...prev, inputOption:v}))
    }}  title="Selecteaza o optiune" options={[
        {title:"Lista de adiacenta", id:1},
        {title:"Matrice de adiacenta", id:2},
        {title:"Matrice de incidenta", id:3},
    ]}></RadioButtons>
    {data.inputOption==1 && <ListaInputMethod></ListaInputMethod>}
    {data.inputOption==2 && <MatriceAdiacenta></MatriceAdiacenta>}
    {data.inputOption==3 && <MatriceIncidenta></MatriceIncidenta>}
    <OptionSelector label={"Source node"} value={data.srcNode} setValue={(v)=>{
        setData(prev=>({...prev,srcNode:v})); setAddWeights(true)
    }} options={
              new Array(data.nrDeVarfuri).fill(0).map((_,i)=>{
                  return {value:i+1, label:i+1}
              })
          }></OptionSelector>

      {addWeights && <WeightInputComponent></WeightInputComponent>}
      <BellmanFordAlg></BellmanFordAlg>
  </Container>
  )
}

export default GraphForm