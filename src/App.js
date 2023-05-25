import './App.css';

import styled from 'styled-components';
import Graph from './components/Graph';
import GraphForm from './components/GraphForm';


const AppContainer  = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 2rem;
width: 100%;
min-height: 100vh;
`
function App() {




  
  return (
    <AppContainer className="App ">
    
            <GraphForm/>
           <Graph/>
   

      
    </AppContainer>
  );
}

export default App;
