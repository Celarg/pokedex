import {gql} from "@apollo/client";
import {POKEMON_FRAGMENT} from "@/lib/api/mutations";

export const GET_POKEMONS = gql`
    query GetListPokemons($limit: Int = 10, $offset: Int = 0, $search: String, $type: String, $isFavorite: Boolean){ pokemons(query: { limit: $limit, offset: $offset, search: $search, filter: { type: $type, isFavorite: $isFavorite }}) { edges { id, name, image, types, isFavorite, maxCP, maxHP, evolutionRequirements {
        amount, name
    }resistant weaknesses,classification}, count } }
`;

export const GET_SINGLE_POKEMON = gql`
    query GetSinglePokemon($id: ID!){ pokemonById( id: $id ) {
        ...NewPokemon}
    }
    ${POKEMON_FRAGMENT}
`;

export const GET_RANDOM_POKEMONS = gql`
    query GetRandomPokemons{ pokemonsRandom { id, name, image, types} }
`;
