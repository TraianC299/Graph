import logo from './logo.svg';
import './App.css';
import OptionSelector from './components/input/OptionSelector';
import RadioButtons from './components/input/RadioButtons';
import { useState } from 'react';
import { useGraph } from './contexts/GraphContext.context';
import Input from './components/input/Input';
import ListaInputMethod from './components/GraphInputMethods/Lista';
import MatriceAdiacenta from './components/GraphInputMethods/MatriceAdiacenta';
import MatriceIncidenta from './components/GraphInputMethods/MatriceIncidenta';
import WeightInputComponent from './components/WeightInputMethods/WeightMatriceAdiacenta.Component';
import BellmanFordAlg from './components/BellmanFordAlg.Component';

function App() {
  const {data, setData} = useGraph()

  const [addWeights, setAddWeights] = useState(false)


  return (
    <div className="App">
    
    <div className='sectionPadding flex column gap2'>
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
    </div>
   

      
    </div>
  );
}

export default App;
