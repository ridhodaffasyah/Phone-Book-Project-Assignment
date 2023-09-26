import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { wrapper } from '@/redux/store/store';
import { Loading, Dot, DotContainer } from './styles';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={
        <Loading>
          <DotContainer>
            <h1>Loading</h1>
            <Dot />
            <Dot />
            <Dot />
          </DotContainer>
        </Loading>
      }>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default wrapper.withRedux(App);
