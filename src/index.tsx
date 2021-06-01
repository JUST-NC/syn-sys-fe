import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';
import localforage from 'localforage';
import { GlobalStyles, theme } from 'twin.macro';
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
const modeTheme = unstable_createMuiStrictModeTheme({}, zhCN);

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <CookiesProvider>
        <StylesProvider injectFirst>
          <ThemeProvider theme={modeTheme}>
            <GlobalStyles />
            <Global
              styles={css`
                button:focus {
                  outline: none !important;
                }

                // 处理 input:-internal-autofill-selected 蓝色背景的问题，目前的妥协方案
                // FIXME: 修复 input 背景的问题
                // 忽略下方的红色波浪线，这只是 webstorm 暂时没有这个选择器
                input:-internal-autofill-selected {
                  -webkit-text-fill-color: ${theme('mainColor')} !important;
                  transition: background-color 5000s ease-in-out 0s !important;
                }
              `}
            />
            <App />
          </ThemeProvider>
        </StylesProvider>
      </CookiesProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
