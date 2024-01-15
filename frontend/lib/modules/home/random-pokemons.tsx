import {getClient} from "@/lib/api/clients/apollo-server-client";
import {RandomPokemonsReposense} from "@/lib/types";
import {GET_RANDOM_POKEMONS} from "@/lib/api/queries";
import {MainPageGridCard} from "../pokemons";

export default async function RandomPokemons() {
    const {data} = await getClient().query<RandomPokemonsReposense>({query: GET_RANDOM_POKEMONS});

    return (
        <>
            {data.pokemonsRandom.map(pokemon => (
                <MainPageGridCard key={pokemon.id} pokemon={pokemon} showFavourite={false}/>
            ))}
        </>
    );
};

