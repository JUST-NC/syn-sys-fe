import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import localforage from 'localforage';
import { GlobalStyles } from 'twin.macro';
import { StylesProvider } from '@material-ui/core/styles';

// 数据库名初始化
localforage.config({
  name: 'syn-sys',
});

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <StylesProvider injectFirst>
        <GlobalStyles />
        <App />
      </StylesProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
