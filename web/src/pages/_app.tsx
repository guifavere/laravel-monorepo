import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { store } from '@app/store';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'light' }}
    >
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>
);

export default App;
