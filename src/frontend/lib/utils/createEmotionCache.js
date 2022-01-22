import createCache from '@emotion/cache';

const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

export default createEmotionCache;