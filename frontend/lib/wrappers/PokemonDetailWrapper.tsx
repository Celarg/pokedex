'use client';

import React, {createContext, PropsWithChildren, useContext} from 'react';
import {Pokemon} from "@/lib/api/gql/graphql";

const PokemonContext = createContext<Pokemon| null>(null);

const PokemonDetailWrapper = ({pokemon,children}:PropsWithChildren<{pokemon:Pokemon}>) => {

    return (
        <PokemonContext.Provider value={pokemon}>
            {children}
        </PokemonContext.Provider>
    );
};


export const usePokemon = () => {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error('usePokemon must be used within a PokemonContext.Provider');
    }
    return context;
}
export default PokemonDetailWrapper;
