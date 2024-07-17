import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Arial', sans-serif;
    background-color: #EDF9F6;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

export default GlobalStyle;


