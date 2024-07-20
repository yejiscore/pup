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

  .slick-slide {
    width: 154px; 
    margin: 0 7px;
  }
`;

export default GlobalStyle;
