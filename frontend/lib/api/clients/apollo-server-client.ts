import {HttpLink} from "@apollo/client";
import {NextSSRApolloClient, NextSSRInMemoryCache,} from "@apollo/experimental-nextjs-app-support/ssr";
import {registerApolloClient} from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
        }),
    });
});
