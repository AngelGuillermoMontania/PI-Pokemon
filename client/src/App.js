import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Nav from './components/nav.jsx';
import Initial from './components/initial.jsx';
import Home from './components/home.jsx';
import Detail from './components/detail.jsx'
import Create from './components/create';


function App() {

  return (
    <div className="App">
      
          <Nav />
          <div>
            <Routes>
              <Route path='/' element={<Initial />} />
              <Route path='home/detail/:id' element={ <Detail />} />
              {/* <Route path='home/detail' element={<Detail />}/> */}
              <Route path='home' element={<Home />} />
              <Route path='create' element={<Create />} />
            </Routes>
          </div>
    </div>
  );
}

export default App;
