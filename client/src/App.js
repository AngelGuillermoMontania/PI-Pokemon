import React from 'react';
import { Routes, Route } from "react-router-dom";
import Nav from './components/nav.jsx';
import Home from './components/home.jsx';
import Detail from './components/detail.jsx';
import Create from './components/create';
import Landing from './components/landing';
import PageNotFound from './components/notFound.jsx';
var app = require('./App.css');


function App() {
    return (
        <div className={app.App}>
            <Nav />
            <div>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='home/detail/:id' element={ <Detail />} />
                    <Route path='home/detail' element={<Detail />}/>
                    <Route path='home' element={<Home />} />
                    <Route path='create' element={<Create />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
