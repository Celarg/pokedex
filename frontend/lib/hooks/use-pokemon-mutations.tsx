'use client';

import {ApolloCache, useMutation} from "@apollo/client";
import {Pokemon} from "@/lib/api/gql/graphql";
import {ModifierDetails} from "@apollo/client/cache";
import {FAVOURITE_POKEMON, POKEMON_FRAGMENT, UNFAVOURITE_POKEMON} from "@/lib/api/mutations/pokemons";
import {GET_POKEMONS} from "@/lib/api/queries";
import {toast} from "sonner";
import {onError} from "@apollo/client/link/error";

const updateCachePokemons = (cache: ApolloCache<any>, modifiedPokemon: Pokemon) => (existingPokemons: any, x: ModifierDetails) => {
    const newPokemonRef = cache.writeFragment({
        data: modifiedPokemon,
        fragment: POKEMON_FRAGMENT,
    });

    let updatedPokemons = existingPokemons.edges.map((pkRef: any) =>
        x.readField('id', pkRef) === modifiedPokemon.id ? newPokemonRef : pkRef
    );

    if(x.storeFieldName.includes("\"isFavorite\":true")){
        updatedPokemons= [...updatedPokemons.filter((pkRef: any) => x.readField('isFavorite', pkRef))]
    }

    return {...existingPokemons, edges: [...updatedPokemons]};
};




export const usePokemonMutations = () => {
    const [favoritePokemon] = useMutation(FAVOURITE_POKEMON, {
        update: (cache, {data: {favoritePokemon}}) => {
            cache.modify({
                fields: {
                    pokemons: updateCachePokemons(cache, favoritePokemon)
                }
            })
        },
        onCompleted: () => {
            toast.success('Pokemon added to favourites');
        },
        onError: (e) => {
            console.log(e.message)
            toast.error('Something went wrong',
                {classNames: {toast: "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg  group-[.toaster]:shadow-red-500/50"}});
        }
    });

    const [unfavoritePokemon] = useMutation(UNFAVOURITE_POKEMON, {
        update: (cache, {data: {unFavoritePokemon}}) => {
            cache.modify({
                fields: {
                    pokemons: updateCachePokemons(cache, unFavoritePokemon),
                },
            });
        },
        onCompleted: () => {
            toast.error('Pokemon removed from favourites');
        },
        onError: (e) => {
            console.log(e.message)
            toast.error('Something went wrong',
                {classNames: {toast: "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg  group-[.toaster]:shadow-red-500/50"}});
        }
    });
    return [
        favoritePokemon,
        unfavoritePokemon
    ] as const;
}
