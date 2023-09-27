import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Loading, Dot, DotContainer } from './styles';

const App = ({ Component, pageProps}: AppProps) => {

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
