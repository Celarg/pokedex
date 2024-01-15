"use client";

import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import {GET_POKEMONS} from "@/lib/api/queries";
import {GetPokemonsQuery} from "@/lib/types";
import {Filters, MainPageBlockCardSkeletonLoading, MainPageGridCard, MainPageListCard} from "@/lib/modules/pokemons";
import {VIEW_MODES} from "@/lib/constants";

//fetch before user reaches the bottom of the page
const SCROLL_OFFSET = 200;

const POKEMON_LIMIT = 20;

const Page = () => {
    const searchParams = useSearchParams()

    const searchQuery = searchParams.get('q') ?? ''
    const searchType = searchParams.get('type') ?? ''
    const viewMode = searchParams.get('view') ?? 'grid'

    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const setIsFavorite = () => {
        if (!searchParams.get('showAll')) return null;
        return searchParams.get('showAll') === 'true' ? null : true;

    }

    const {data, loading, fetchMore, refetch} = useQuery<GetPokemonsQuery>(GET_POKEMONS, {
        variables: {
            offset: 0,
            limit: POKEMON_LIMIT,
            search: searchQuery,
            type: searchType,
            isFavorite: setIsFavorite(),
        },
    });


    useEffect(() => {

        const handleScroll = async () => {
            if (isFetchingMore || loading || data?.pokemons.edges.length === data?.pokemons.count) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - SCROLL_OFFSET) {
                setIsFetchingMore(true)
                await fetchMore({
                    variables: {offset: data?.pokemons.edges.length || 0},
                    updateQuery: (prev, {fetchMoreResult}) => {
                        if (!fetchMoreResult) return prev;
                        return {
                            ...prev,
                            pokemons: {
                                ...prev.pokemons,
                                edges: [
                                    ...prev.pokemons.edges,
                                    ...fetchMoreResult.pokemons.edges
                                ]
                            }
                        }
                    }
                })
                setIsFetchingMore(false)
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [data?.pokemons.edges.length]);


    return (
        <main className='w-full px-4 max-w-[1400px] mx-auto'>
            <h1 className='text-6xl mt-10 font-bold text-center text-accent/90'>
                Pokédex
            </h1>
            <Filters refetch={isFavorite => refetch({isFavorite: isFavorite})}/>
            {viewMode === VIEW_MODES.LIST &&

                <div className='w-fit mx-auto xl:mx-0 xl:w-full'>
                    <div className='grid gap-4 mx-auto xl:grid-cols-2 xl:mx-0'>
                        {!loading &&
                            data?.pokemons.edges.map((pokemon, index) => (
                                <MainPageListCard key={pokemon.id} pokemon={pokemon}/>
                            ))
                        }
                    </div>
                </div>
            }
            {viewMode === VIEW_MODES.GRID &&
                <div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 place-items-center pb-20 md:w-fit md:mx-auto xl:w-auto'>
                    {!loading &&
                        data?.pokemons.edges.map((pokemon, index) => (
                            <MainPageGridCard key={pokemon.id} pokemon={pokemon}/>
                        ))
                    }
                    {(loading || isFetchingMore) &&
                        [...new Array(20)].map((_, index) =>
                            <MainPageBlockCardSkeletonLoading key={index}/>
                        )
                    }
                </div>}


            {(!loading) && !data?.pokemons.edges.length &&
                <div className='flex justify-center items-center h-[80vh]'>
                    <h1 className='text-3xl font-bold text-center text-accent'>No results found</h1>
                </div>
            }

        </main>
    )
};

export default Page;
