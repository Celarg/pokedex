'use client';

import React, {Fragment} from 'react';
import {ROUTES} from "@/lib/constants";
import Image from "next/image";
import {Favorite, FavoriteFilled} from "@carbon/react/icons";
import Link from "next/link";
import {Pokemon} from "@/lib/api/gql/graphql";
import {useRouter} from "next/navigation";
import {createQueryString} from "@/lib/helpers";
import {usePokemonMutations} from "@/lib/hooks";
import action from "@/app/actions";
import TypeBadge from "@/lib/modules/pokemons/type-badge";
import {PokemonTypesValue} from "@/lib/types";
import PokemonTypes from "@/lib/modules/pokemons/[id]/pokemon-types";

type MainPageCardProps = {
    pokemon: Pokemon;
    showFavourite?: boolean;
}

const MainPageGridCard = ({pokemon, showFavourite = true}: MainPageCardProps) => {

    const [favoritePokemon, unFavoritePokemon] = usePokemonMutations();

    const handleFavourite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault()
        const mutation = pokemon.isFavorite ? unFavoritePokemon : favoritePokemon;
        try {
            mutation({
                variables: {
                    id: pokemon?.id
                }
            })
            action(pokemon?.id!);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Link href={`${ROUTES.HOME}/${pokemon.id}`} key={pokemon.name}
              className='h-full max-w-[400px] md:min-w-[320px] xl:min-w-0 w-full flex flex-col justify-between relative rounded-xl border border-primary overflow-hidden border-solid pt-4 hover:scale-105 active:scale-95 transition-all shadow-primary/40 shadow-lg'>
            <Image src={pokemon.image} alt={pokemon.name} width={200} height={200}
                   className='mx-auto mb-4 w-52 h-48 object-contain'/>
            <p className='absolute top-0 left-0 m-1 p-1 text-[0.75rem] font-extrabold bg-accent text-white rounded-lg'>
                #0{pokemon.id}
            </p>
            <div className={`${showFavourite ? 'py-2' : 'py-2'} py-2 pl-4 flex justify-between items-center`}>
                <div>
                    <h3 className='font-bold text-accent'>{pokemon.name}</h3>
                    <p className='text-primary flex items-center gap-1'>
                        <PokemonTypes types={pokemon.types as PokemonTypesValue[]}/>
                    </p>
                </div>
                {showFavourite &&
                    <div className='px-4 py-2 hover:scale-125 active:scale-95 transition-all' onClick={handleFavourite}>
                        {!pokemon.isFavorite ? <Favorite className='text-red-500' size={24}/> :
                            <FavoriteFilled className='text-red-500' size={24}/>}
                    </div>}
            </div>
        </Link>
    );
};

export const MainPageBlockCardSkeletonLoading = () => (
    <div
        className='h-full max-w-[400px] md:min-w-[320px] p-4 xl:min-w-0 w-full flex flex-col justify-between relative rounded-xl border border-primary overflow-hidden border-solid pt-4 hover:scale-105 transition-all shadow-primary/40 shadow-lg animate-pulse'>
        <div className='bg-gray-300 h-48 w-full rounded-t-md'></div>
        <div className='pt-4 flex justify-between items-center'>
            <div>
                <h3 className='font-bold text-accent bg-gray-300 h-6 w-24 mb-2'></h3>
                <div className='bg-gray-300 h-4 w-20 rounded-bl-md'></div>
            </div>
            <div className='bg-gray-300 h-6 w-6'></div>
        </div>
    </div>
);


export default MainPageGridCard;
