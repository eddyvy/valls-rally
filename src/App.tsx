import React from 'react';
import coche from './assets/coche.svg';
import './App.css';
import Inicio from './components/Inicio'

function App() {
  return (
    <div className="App">
      <header className="App-header mt-3 mb-2">
        <img src={coche} className="App-logo" alt="logo" />
        <h3>
          Rally Valls
        </h3>
      </header>
      <Inicio/>
    </div>
  );
}

export default App;
