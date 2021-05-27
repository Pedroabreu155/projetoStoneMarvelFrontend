import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header';

import GlobalStyle from './globalStyles'

function App() {
  return (
  <div className="App">
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <Routes/>
    </BrowserRouter>
  </div>
  );
}

export default App;
