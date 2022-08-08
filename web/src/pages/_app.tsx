import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

const App = ({ Component, pageProps }: AppProps) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'light' }}
  >
    <Component {...pageProps} />
  </MantineProvider>
);

export default App;
