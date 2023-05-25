import React from 'react'
import { Button, Table } from '../styles/global'
import useBF from '../hooks/useBF'
import { useGraph } from '../contexts/GraphContext.context'
import UtilityService from '../services/UtilityService.service'

const BellmanFordAlg = () => {
  const {data} =useGraph()
    const {calculateDistances} = useBF()

  return (
    <div><Button onClick={calculateDistances}>Calculate distances</Button>
    {/* <ul>
       {!UtilityService.isEmptyObject(data.distances) && Object.keys(data.distances).map((node,i)=>{
            return <li key={i}>{node} : {data.distances[node]}</li>
        }
        )}
        </ul> */}
        <Table style={{marginTop: "2rem"}}>

        <tr>
            <th>Node</th>
            <th>Distance</th>
        </tr>
        {!UtilityService.isEmptyObject(data.distances) && Object.keys(data.distances).map((node,i)=>{

            return <tr key={i}>
                <td>{node}</td>
                <td>{data.distances[node]}</td>
            </tr>
        }
        )}

        </Table>
        </div>
  )
}

export default BellmanFordAlg