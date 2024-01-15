"use client";

import React, {PropsWithChildren} from 'react';
import {ApolloProvider} from "@apollo/client";
import ApolloClient from "@/lib/api/clients/apollo-browser-client";

const ApolloWrapper = ({children}:PropsWithChildren) => {
    return (
        <ApolloProvider client={ApolloClient}>
            {children}
        </ApolloProvider>
    );
};

export default ApolloWrapper;
