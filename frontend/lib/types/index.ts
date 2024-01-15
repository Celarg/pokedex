import {Pokemon} from "@/lib/api/gql/graphql";
import {POKEMON_TYPES, VIEW_MODES} from "@/lib/constants";

export interface RandomPokemonsReposense {
    pokemonsRandom:  Pokemon[];
}

export interface GetPokemonsQuery {
    pokemons: {
        edges: Pokemon[];
        count: number;
    }
}

export interface GetPokemonByIdQuery {
    pokemonById: Pokemon;
}

export type PokemonTypesKey = keyof typeof POKEMON_TYPES;
export type PokemonTypesValue = typeof POKEMON_TYPES[PokemonTypesKey];

export type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];
