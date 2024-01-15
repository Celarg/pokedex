import ApolloProvider from './ApolloWrapper';
import {PropsWithChildren} from "react";
import PokemonDetailWrapper, {usePokemon} from "@/lib/wrappers/PokemonDetailWrapper";
import {Toaster} from "./Toaster";

export const MainWrapper = ({ children }:PropsWithChildren) => {
    return <ApolloProvider>
        {children}
        <Toaster/>
    </ApolloProvider>;
}

export {
    PokemonDetailWrapper,
    usePokemon
}
