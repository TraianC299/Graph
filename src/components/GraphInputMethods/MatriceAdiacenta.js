import React, { useEffect, useState } from 'react'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { Table } from '../../styles/global'
import useMatriceaDeAdiacenta from '../../hooks/useMatriceaDeAdiacenta'



const MatriceAdiacenta = () => {
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
                        return <td >
                            <Ckeckbox
                            matriceAdiacenta={matriceAdiacenta}  
                            setMatriceAdiacenta={setMatriceAdiacenta}
                            i={i} 
                            j={j} 
                        ></Ckeckbox>
                        </td>
                    })}
                </tr>
            )
        })}

    </Table>
  )
}

export default MatriceAdiacenta


const Ckeckbox = ({i, j, matriceAdiacenta, setMatriceAdiacenta}) => {
    const [value, setValue] = useState(matriceAdiacenta[i][j])

    useDidMountEffect(()=>{
        const number = value ? 1 : 0
        const newMatriceAdiacenta = [...matriceAdiacenta]
        newMatriceAdiacenta[i][j] = number
        setMatriceAdiacenta([...newMatriceAdiacenta])
    }, [value])

    

    return(
        <input 
        type="checkbox"  
        checked={value} 
        onChange={(e)=>{setValue(e.target.checked)}}
        ></input>
    )
}