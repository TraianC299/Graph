import { useState } from "react"
import { useGraph } from "../contexts/GraphContext.context"
import useDidMountEffect from "./useDidMountEffect"



class Graph{
    constructor(nodes, srcNode, edges) {
        this.nodes = nodes;
        this.srcNode = srcNode;
        this.edges = edges
        this.nrDeVarfuri = nodes.length
      }

    }
const useBF = () => {
    const {data, setData} = useGraph()
    


    const calculateDistances = () => {
        let distances = {}
        for(let i=0; i<data.nrDeVarfuri; i++){
            distances[i+1] = Math.pow(10, 100)
        }
        distances[data.srcNode] = 0
        const edges = data.edges
        for(let i=0; i<data.nrDeVarfuri-1; i++){
            edges.forEach(edge=>{
                if(distances[edge.from] + edge.value < distances[edge.to]){
                    distances[edge.to] = parseInt(distances[edge.from]) + parseInt(edge.value)
                }
            });
        }
        setData(prev=>({...prev, distances}))

    }


    return {calculateDistances}


}


export default useBF