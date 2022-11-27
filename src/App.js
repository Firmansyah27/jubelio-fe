import './App.css';
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './views/home'
import ImportProducts from './views/import'
import Container from './views/container';

const App = ()=> {
  return (
    <div className='App'>
      <h1>Products</h1>

      <nav>
        <ul>
            <Link to="/">Home</Link>
        </ul>
        <ul>
            <Link to="/import">Import</Link>
        </ul>
      </nav>
      <Container>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="import" element={<ImportProducts />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
