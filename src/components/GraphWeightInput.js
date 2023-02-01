import React from 'react'
import { useGraph } from '../contexts/GraphContext.context'
import Input from './input/Input'

const GraphWeightInput = () => {
    const {data, setData} = useGraph()
  return (
    <div>
        {Object.keys(data.listaAdiacenta).map(startNode=>{
            return <div>
                <h4 className='h4'>Node {startNode}</h4>
                {data.listaAdiacenta[startNode].map(endNode=><Input type="number" label={endNode}></Input>)}
            </div>
        })}
    </div>
  )
}

export default GraphWeightInput