import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const App = ({ Component, pageProps }: AppProps) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'light' }}
  >
    <NotificationsProvider>
      <Component {...pageProps} />
    </NotificationsProvider>
  </MantineProvider>
);

export default App;
