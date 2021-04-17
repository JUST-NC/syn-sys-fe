import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import localforage from 'localforage';
import { GlobalStyles } from 'twin.macro';
import {
  StylesProvider,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core/styles';
import { css, Global, ThemeProvider } from '@emotion/react';
import { zhCN } from '@material-ui/core/locale';

// 数据库名初始化
localforage.config({
  name: 'syn-sys',
});

// 处理某些组件在严格模式下产生 warning 的问题
// 同时提供一些官方的本地化……我也不知道有啥用
const theme = unstable_createMuiStrictModeTheme({}, zhCN);

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Global
            styles={css`
              button:focus {
                outline: none !important;
              }
            `}
          />
          <App />
        </ThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
