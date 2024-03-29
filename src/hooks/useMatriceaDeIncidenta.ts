import { useGraph } from "../contexts/GraphContext.context"


const convertToMatriceDeIncidenta = (listaAdiacenta: { [x: string]: any[] }, nrDeVarfuri: Number) => {

    const legaturi = []
    Object.keys(listaAdiacenta).forEach((i)=>{
        listaAdiacenta[i].forEach((j: any)=>{
            legaturi.push([Number(i),Number(j)])
        })
    })
    
    const matrix=[]
    legaturi.forEach((legatura)=>{
        const row = new Array(nrDeVarfuri).fill(0)
        row[legatura[0]-1]=-1
        row[legatura[1]-1]=1
        matrix.push(row)
    })
    
    const convertedMatrixObject = {}
    matrix.forEach((row,i)=>{
        convertedMatrixObject[legaturi[i].toString()] = matrix[i]
    })
    
    return convertedMatrixObject
    }


const convertFromMatriceDeIncidenta = (matriceaDeIncidenta: number | 0[]) => {
    const newListaAdiacenta = {}
    //construim lista de adiacenta
    Object.keys(matriceaDeIncidenta).forEach((legatura)=>{
        const [startVarf, endVarf] = legatura.split(",").map((i)=>Number(i))
        if(!newListaAdiacenta[startVarf]){
            newListaAdiacenta[startVarf] = []
        }
        newListaAdiacenta[startVarf].push(endVarf)
    }
    )
    return newListaAdiacenta
}


const useMatriceaDeIncidenta = () => {
    const {data, setData} = useGraph()
 
    return {  matriceaIncideanta:convertToMatriceDeIncidenta(data.listaAdiacenta, data.nrDeVarfuri), 
        setMatriceaIncidenta: (newMatriceaIncidenta: number | 0[])=>{
            setData((prev: any)=>({...prev, listaAdiacenta:convertFromMatriceDeIncidenta(newMatriceaIncidenta)}))
        }
        
    }


}


export default useMatriceaDeIncidenta