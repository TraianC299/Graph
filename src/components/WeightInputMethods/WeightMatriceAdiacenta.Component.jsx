import React, { useEffect, useState } from 'react'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { Table } from '../../styles/global'
import useMatriceaDeAdiacenta from '../../hooks/useMatriceaDeAdiacenta'
import { useGraph } from '../../contexts/GraphContext.context'



const WeightInputComponent = () => {
    const {matriceAdiacenta, setMatriceAdiacenta} = useMatriceaDeAdiacenta()



  return (
    
    <Table>
        <tr>
            <th>MA</th>
            {matriceAdiacenta.map((_,i)=>{
                return <th key={"column" + i+1}>{i+1}</th>
            })}
        </tr>
        {matriceAdiacenta.map((_,i)=>{
            return(
                <tr key={i}>
                    <th>{i+1}</th>
                    {matriceAdiacenta.map((_,j)=>{
                        return <td  key={"roe" + j+1}>
                            {matriceAdiacenta[i][j]?<WeightInput key={`${i+1}-${j+1}`} i={i+1} j={j+1}></WeightInput>:null}
                        </td>
                    })}
                </tr>
            )
        })}
    </Table>
  )
}

export default WeightInputComponent


const WeightInput = ({i, j}) => {
    const {data, setData} = useGraph()
    const [value, setValue] = useState()

  
    
    const changeValue = (value) => {
        setValue(parseInt(value))
        setData(prev=>{
            let edges = prev.edges.filter(el=>!(el.from === i && el.to === j));
            edges.push({
                from:i,
                to:j,
                value: value
            });
            return ({...prev, edges})
        })

    }
    

    return(
        <input 
        type="number"  
        value={value}
        onChange={(e)=>changeValue(parseInt(e.target.value))}
        ></input>
    )
}