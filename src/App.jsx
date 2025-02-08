
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import {Home} from './componentes/Home';
import { ResultaRuta } from "./componentes/ResultadoRuta";

function App() {


  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path= "/resultado" element = {<ResultaRuta/>}/> 
          </Routes>
      </Router>
    );
}

export default App
