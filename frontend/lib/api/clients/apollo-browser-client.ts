import {ApolloClient, InMemoryCache} from "@apollo/client";

const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";

const createApolloClient = () => {
    return new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        cache: new InMemoryCache({}),
    });
};

const Client = createApolloClient();


export default Client;
