import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header';
import GlobalStyle from './globalStyles'

function App() {
  return (
  <BrowserRouter>
    <GlobalStyle/>
    <Header/>
    <Routes/>
  </BrowserRouter>
  );
}

export default App;
