import React, { useEffect, useState } from 'react'
import { useGraph } from '../../contexts/GraphContext.context'
import { Button, Table } from '../../styles/global'
import { RED } from '../../data/constants'
import OptionSelector from '../input/OptionSelector'
import useMatriceaDeIncidenta from '../../hooks/useMatriceaDeIncidenta.ts'



const MatriceIncidenta = () => {
    const {data} = useGraph()
    const {matriceaIncideanta, setMatriceaIncidenta} = useMatriceaDeIncidenta()

    const [startVarf, setStartVarf] = useState(1)
    const [endVarf, setEndVarf] = useState(1)



    const adaugaLegatura = () => {
        setMatriceaIncidenta(prev=>{
            const newObj = {...prev}
            newObj[`${startVarf},${endVarf}`] = new Array(data.nrDeVarfuri).fill(0)
            newObj[`${startVarf},${endVarf}`][startVarf-1] = 1
            newObj[`${startVarf},${endVarf}`][endVarf-1] = -1
            return newObj
        })
    }

    const deleteLegatura = (startVarf, endVarf) => {
        setMatriceaIncidenta(prev=>{
            const newObj = {...prev}
            delete newObj[`${startVarf},${endVarf}`]
            return newObj
        })
    }
   

  return (
    <div className='flex column gap2'>
        <Table>
            <tr>
                <th>(x(i), x(j))</th>
                {new Array(data.nrDeVarfuri).fill(0).map((_,i)=>{
                    return <th key={"column"+i+1}>{i+1}</th>
                }
                )}
            </tr>
            {Object.keys(matriceaIncideanta).map((legatura)=>{
                return(
                    <tr key={legatura}>
                        <th><Button style={{color:RED}} className='small text' onClick={()=>{
                            deleteLegatura(...legatura.split(","))}}>Delete</Button> {legatura}</th>
                        {matriceaIncideanta[legatura].map((valoare, i)=>{
                            return <td key={i}>{valoare}</td>
                        })}
                    </tr>
                )
            })}
        </Table>
        <div className='flex gap1'>
            {/* value startVarf */}
            <OptionSelector value={startVarf} setValue={setStartVarf} options={
                new Array(data.nrDeVarfuri).fill(0).map((_,i)=>{
                    return {value:i+1, label:i+1}
                })
            }></OptionSelector>
            {/* value endVarf */}
            <OptionSelector value={endVarf} setValue={setEndVarf} options={
                new Array(data.nrDeVarfuri).fill(0).map((_,i)=>{
                    return {value:i+1, label:i+1}
                })
            }></OptionSelector>
            {/* add legatura button */}
            <Button className='small' onClick={()=>adaugaLegatura()}>+</Button>
        </div>
    </div>
  )
}

export default MatriceIncidenta

