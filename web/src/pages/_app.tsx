import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'light' }}
    >
      <Component {...pageProps} />
    </MantineProvider>
);

export default App
