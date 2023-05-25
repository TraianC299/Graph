import React from 'react'
import styled from 'styled-components'
import { useGraph } from '../contexts/GraphContext.context'
import UtilityService from '../services/UtilityService.service'
import { GREYWHITE } from '../data/constants'
const graphHW = 300
const nodeHW = 50

const Container = styled.div`
flex: 1;
background-color: ${GREYWHITE};
display: flex;
justify-content: center;
align-items: center;
height: 100%;
`
const NodeStyle = styled.div`
  width: ${nodeHW}px;
  height: ${nodeHW}px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  //a line to another node

`

const GraphContainer = styled.div`
height: ${graphHW}px;
width: ${graphHW}px;
`
const Graph = ({ }) => {
  const { data } = useGraph()
  const ref = React.useRef()

  const {
    nrDeVarfuri,
    listaAdiacenta,
    edges
  } = data

  const drawArrow = (x1, y1, x2, y2, t = 0.95) => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
  	const arrow = {
        dx: x2 - x1,
        dy: y2 - y1
    };
  	const middle = {
        x: arrow.dx * t + x1,
        y: arrow.dy * t + y1
    };
    const tip = {
        dx: x2 - middle.x,
        dy: y2 - middle.y
    };
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(middle.x, middle.y);
  	ctx.moveTo(middle.x + 0.5 * tip.dy, middle.y - 0.5 * tip.dx);
    ctx.lineTo(middle.x - 0.5 * tip.dy, middle.y + 0.5 * tip.dx);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
};

  const drawLine = (x1, y1, x2, y2) => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }  

  const drawWeight = (x1, y1, x2, y2, weight) => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")
    ctx.font = "20px Arial";
    ctx.fillText(weight, (x1 + x2) / 2, (y1 + y2) / 2);
    //make the text green
    ctx.fillStyle = "green";
  }
  React.useEffect(() => {
    if (UtilityService.isEmptyObject(listaAdiacenta)) {
      return
    } else {
      Object.keys(listaAdiacenta).forEach(startNode => {
        listaAdiacenta[startNode].forEach(el => {
          const node1 = document.getElementById(`node-${startNode}`)
          const node2 = document.getElementById(`node-${el}`)
          const x1 = node1.offsetLeft
          const y1 = node1.offsetTop
          const x2 = node2.offsetLeft
          const y2 = node2.offsetTop
          drawArrow(x1, y1, x2, y2)
        })
      })
    }

  }, [listaAdiacenta])



  React.useEffect(() => {
    if (UtilityService.isEmptyObject(listaAdiacenta)) {
      return
    } else {
      
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      edges.forEach(edge => {
        const node1 = document.getElementById(`node-${edge.from}`)
        const node2 = document.getElementById(`node-${edge.to}`)
        const x1 = node1.offsetLeft
        const y1 = node1.offsetTop
        const x2 = node2.offsetLeft
        const y2 = node2.offsetTop
        drawWeight(x1, y1, x2, y2, edge.value)


      })
    }
  }, [edges])





  return (
    <Container>
      <GraphContainer style={{
        position: 'relative',
      }}>
        <canvas ref={ref} id="myCanvas" width={graphHW} height={graphHW} ></canvas>
        {/* i want nodes to make a perfect circle in order to create a graph */}
        {[...new Array(nrDeVarfuri)].map((node, index) => (
          <Node index={index} nrDeVarfuri={nrDeVarfuri} />
        ))}
      </GraphContainer>
    </Container>
  )
}

export default Graph



const Node = ({
  index,
  nrDeVarfuri
}) => {

  return (
    <NodeStyle id={`node-${index + 1}`} key={index} style={{
      top: `${nodeHW + nodeHW * Math.sin(index * 2 * Math.PI / nrDeVarfuri)}%`,
      left: `${nodeHW + nodeHW * Math.cos(index * 2 * Math.PI / nrDeVarfuri)}%`,
    }}>
      {index + 1}
    </NodeStyle>
  )
}
