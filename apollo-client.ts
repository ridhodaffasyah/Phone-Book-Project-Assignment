// ./apollo-client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://wpe-hiring.tokopedia.net/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;