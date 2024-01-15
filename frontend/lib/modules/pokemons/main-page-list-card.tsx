import React from 'react';
import {usePokemonMutations} from "@/lib/hooks";
import action from "@/app/actions";
import {Pokemon} from "@/lib/api/gql/graphql";
import {ROUTES} from "@/lib/constants";
import Image from "next/image";
import {PokemonTypesValue} from "@/lib/types";
import {Favorite, FavoriteFilled} from "@carbon/react/icons";
import Link from "next/link";
import PokemonTypes from "@/lib/modules/pokemons/[id]/pokemon-types";
import TypeBadge from "@/lib/modules/pokemons/type-badge";

type ListCardProps = {
    pokemon: Pokemon;
}

const ListCard = ({pokemon}: ListCardProps) => {
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
              className='h-full w-full flex relative pr-4 rounded-xl border border-primary overflow-hidden border-solid hover:scale-105 transition-all shadow-primary/40 shadow-lg'>

            <div className='relative p-4 pr-0 flex items-center'>
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className='mx-auto w-52 h-48 object-contain'
                />
                <p className='absolute top-0 left-0 m-1 p-1 text-[0.75rem] font-extrabold bg-accent text-white rounded-lg'>
                    #0{pokemon.id}
                </p>
                <div
                    className='px-2 py-2 absolute right-0 bottom-4 bg-white rounded-full shadow-md shadow-primary hover:scale-125 active:scale-95 transition-all'
                    onClick={handleFavourite}>
                    {!pokemon.isFavorite ? <Favorite className='text-red-500' size={24}/> :
                        <FavoriteFilled className='text-red-500' size={24}/>}
                </div>
            </div>
            <div className={`pl-4 py-4 flex flex-col w-fit`}>
                <h3 className='font-bold text-accent mb-2'>{pokemon.name}&nbsp;-&nbsp;<span
                    className='text-primary'>{pokemon.classification}</span></h3>
                <div className='flex items-center gap-1 mb-4'>
                    <PokemonTypes types={pokemon.types as PokemonTypesValue[]}/>
                </div>
                <div className='grid my-auto sm:my-0 sm:mb-2 grid-cols-4 sm:grid-cols-6 text-accent gap-2 sm:gap-4 items-center min-w-0'>
                    <div className='text-center'>
                        <p>
                            HP
                        </p>
                        <p>
                            CP
                        </p>
                    </div>
                    <div className='col-span-2 sm:col-span-4 grid gap-4'>
                        <div className='bg-green-800 rounded-lg h-1.5 w-full'/>
                        <div className='bg-blue-800  rounded-lg h-1.5 w-full'/>
                    </div>
                    <div className='text-center grid'>
                        <p>
                            {pokemon.maxHP}
                        </p>
                        <p>
                            {pokemon.maxCP}
                        </p>
                    </div>
                </div>
                <div className='hidden sm:block'>
                    <p className='text-primary font-bold text-sm'>
                        Resistance
                    </p>
                    <div className='flex gap-1.5 flex-wrap mb-2'>
                        {pokemon.resistant.map(type => <TypeBadge size={'small'} type={type as PokemonTypesValue}/>)}
                    </div>
                    <p className='text-primary font-bold text-sm'>
                        Weaknesses
                    </p>
                    <div className='flex gap-1.5 flex-wrap'>
                        {pokemon.weaknesses.map(type => <TypeBadge size={'small'} type={type as PokemonTypesValue}/>)}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListCard;
