import React from 'react'
import { useGraph } from '../contexts/GraphContext.context'
import { Button } from '../styles/global'
import useBF from '../hooks/useBF'

const BellmanFordAlg = () => {
    const {calculateDistances} = useBF()
  return (
    <div><Button onClick={calculateDistances}>Calculate distances</Button>
    <div>
       
        </div>
        </div>
  )
}

export default BellmanFordAlg