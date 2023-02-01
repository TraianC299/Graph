import { useGraph } from "../contexts/GraphContext.context"

const convertListToMA = (listaAdiacenta, nrDeVarfuri) => {
    //construim matricea de adiacenta cu 0
    const matrix = new Array(nrDeVarfuri).fill(0).map((_,i)=>new Array(nrDeVarfuri).fill(0))
    //construim matricea de adiacenta

    for(let i=1;i<=nrDeVarfuri;i++){
        if(listaAdiacenta[i]){
            listaAdiacenta[i].forEach((j)=>{
                matrix[i-1][j-1]=1
            })
        }else{
            for(let i = 0;i<nrDeVarfuri;i++) matrix[i][i]=1
        }
    }
    return matrix
}


const convertMAtoList = (matriceaDeAdiacenta) => {
    //construim lista de adiacenta
    const newListaAdiacenta = {} 
    matriceaDeAdiacenta.forEach((row,i)=>{
        newListaAdiacenta[i+1] = []

        row.forEach((value,j)=>{
            if(value===1){
                newListaAdiacenta[i+1].push(j+1)
            }
        })
    })
    return newListaAdiacenta
}




const useMatriceaDeAdiacenta = () => {
    const {data, setData} = useGraph()
 

    return {
        matriceAdiacenta:convertListToMA(data.listaAdiacenta, data.nrDeVarfuri), 
        setMatriceAdiacenta: (newMatriceAdiacenta)=>{
            setData(prev=>({...prev, listaAdiacenta:convertMAtoList(newMatriceAdiacenta)}))
        }
    }


}


export default useMatriceaDeAdiacenta