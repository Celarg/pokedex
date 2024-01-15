import {gql} from "@apollo/client";

export const POKEMON_FRAGMENT = gql`
    fragment NewPokemon on Pokemon {
        id,
        name,
        image,
        types,
        attacks {
            special
            { name, type, damage }
            fast {
                name, type, damage
            }
        }
        sound
        evolutionRequirements {
            name, amount
        }
        evolutions {
            id, name, image, evolutionRequirements {
                name, amount
            }
        }
        weight {
            minimum, maximum
        }
        height {
            minimum, maximum
        }
        classification
        fleeRate
        maxCP
        maxHP
        resistant
        weaknesses
        fleeRate
        isFavorite
    }
`;


export const FAVOURITE_POKEMON = gql`
    mutation AddFavouritePokemon($id: ID!){
        favoritePokemon(id: $id) {
            ...NewPokemon
        } }
    ${POKEMON_FRAGMENT}
`;

export const UNFAVOURITE_POKEMON = gql`
    mutation RemoveFavouritePokemon($id: ID!){
        unFavoritePokemon(id: $id) {
            ...NewPokemon
        }
    }
    ${POKEMON_FRAGMENT}
`;

