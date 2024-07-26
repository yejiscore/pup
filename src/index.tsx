// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RecoilRoot } from 'recoil';
// import { ThemeProvider } from 'styled-components';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { CookiesProvider } from 'react-cookie';
// import GlobalStyle from './styles/GlobalStyle';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import theme from './styles/theme/theme';

// declare global {
//   interface Window {
//     Tmapv2: any;
//   }
// }
// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <CookiesProvider>
//     <RecoilRoot>
//       <QueryClientProvider client={queryClient}>
//         <ReactQueryDevtools initialIsOpen={false} />
//         <ThemeProvider theme={theme}>
//           <GlobalStyle />
//           <App />
//         </ThemeProvider>
//       </QueryClientProvider>
//     </RecoilRoot>
//   </CookiesProvider>
// );

// reportWebVitals();

/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <App />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
