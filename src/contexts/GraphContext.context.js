import React, {useContext, useEffect, useState} from 'react'
import useDidMountEffect from '../hooks/useDidMountEffect'


const GraphContext = React.createContext()


export const useGraph=()=>{
        return useContext(GraphContext)
    }


    
    
    export const GraphProvider = ({children}) => {
        const [data, setData] = useState({
            inputOption: 0,
            nrDeVarfuri: 0,
            listaAdiacenta: {
            },
            srcNode:null,
            edges: [],
            distances: {}
        })
        


        
        
    useDidMountEffect(()=>{
        new Array(data.nrDeVarfuri).fill(0).map((_,i)=>{
            setData(prev=>({...prev, listaAdiacenta:{
                ...prev.listaAdiacenta,
                [i+1]:[]
            }}))
        })
    },[data.nrDeVarfuri])



    

    let value={
        data, setData
    }

  
    return (
        <GraphContext.Provider value={value}>
        {children}
        </GraphContext.Provider>
    )
}

