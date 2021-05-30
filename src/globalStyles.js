import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0
  }

  body, html {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    font-family: Helvetica, Sans-Serif;
    background-color: rgb(171, 171, 171);
    color: black;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
`
export default GlobalStyle