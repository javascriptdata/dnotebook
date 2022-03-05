import '../styles/globals.css'
import store from '../lib/state/store'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../lib/helpers/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();


function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
    </CacheProvider>
  )
}

export default MyApp
