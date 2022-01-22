import '../styles/globals.css'
import store from '../lib/state/store'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/utils/createEmotionCache';
import lightTheme from '../styles/themes/lightTheme';

const clientSideEmotionCache = createEmotionCache();


function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (


    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
