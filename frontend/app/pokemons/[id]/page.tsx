import React from 'react';
import {getClient} from "@/lib/api/clients/apollo-server-client";
import {GetPokemonByIdQuery, PokemonTypesValue} from "@/lib/types";
import {GET_SINGLE_POKEMON} from "@/lib/api/queries";
import Image from "next/image";
import {padNumber} from "pvutils";
import {PokemonDetailWrapper} from "@/lib/wrappers";
import './index.scss';

import {
    AttacksTable,
    EvolutionTracker,
    GoBack,
    PokemonAudio,
    PokemonStats,
    ResistantAndWeakness
} from "@/lib/modules/pokemons/[id]";
import FavouritePokemon from "@/lib/modules/pokemons/[id]/favourite-button";
import TypeBadge from "@/lib/modules/pokemons/type-badge";


type PokemonDetailProps = {
    params: {
        id: string
    };
}

const NUMBER_OF_ALL_POKEMONS = 151;

export async function generateStaticParams() {
    return [...new Array(NUMBER_OF_ALL_POKEMONS)].map((_, index) => {
        return {
            id: padNumber(index + 1, 3).toString(),
        };
    });
}

const PokemonDetail = async ({params}: PokemonDetailProps) => {
    const {data,} = await getClient().query<GetPokemonByIdQuery>({
        context: {
            fetchOptions: {
                next: {
                    tags: [`pokemon-detail/${params.id}`],
                }
            },
        },
        query: GET_SINGLE_POKEMON,
        variables: {id: params.id},
    });

    const pokemon = data?.pokemonById || null;

    return (
        <main className="w-full relative pb-5">
            <h2 className='text-6xl mt-4 text-accent font-bold mb-4 text-center'>
                {pokemon?.name} <span className='text-primary'>#0{pokemon.id}</span>
            </h2>
            <p className='text-2xl text-tertiary bg-secondary  mb-8 font-bold text-center relative'>
                <GoBack/>
                {pokemon.classification}
            </p>

            <PokemonDetailWrapper pokemon={pokemon}>
                <div className='gridArea lg:px-4 xl:px-0 max-w-[1280px] mx-auto'>
                    <section className='relative image items mx-auto w-full '>
                        <div
                            className='grid mb-0 px-8 gap-1.5 lg:place-items-end absolute left-0 lg:left-auto lg:right-0'>
                            {pokemon?.types.map(type => (
                                <TypeBadge type={type as PokemonTypesValue} key={type}/>
                            ))}
                        </div>
                        <PokemonAudio/>
                        <FavouritePokemon/>
                        <Image
                            src={pokemon.image} alt={pokemon.name} width={200} height={200}
                            className='mx-auto mb-4 w-80 h-80 object-contain'
                        />
                    </section>
                    <div
                        className='flex flex-col bg-primary shadow-primary/50 shadow-md transition-all py-2 stats gap-2 border-2 border-solid border-primary justify-center rounded-md mx-4 md:w-[600px] md:mx-auto lg:w-full'>
                        <PokemonStats pokemon={pokemon}/>
                        <ResistantAndWeakness pokemon={pokemon}/>
                    </div>
                    <EvolutionTracker/>
                    <AttacksTable pokemon={pokemon}/>
                </div>
            </PokemonDetailWrapper>
        </main>
    );
};

export default PokemonDetail;
