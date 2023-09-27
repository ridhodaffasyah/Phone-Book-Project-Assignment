import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import { Loading, Dot, DotContainer } from './styles';

const App = ({ Component, pageProps}: AppProps) => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
