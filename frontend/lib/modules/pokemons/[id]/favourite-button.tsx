'use client';

import React, {useState} from 'react';
import {Favorite, FavoriteFilled} from "@carbon/react/icons";
import {usePokemon} from "@/lib/wrappers";
import action from "@/app/actions";
import {usePokemonMutations} from "@/lib/hooks";

const FavouritePokemon = () => {
    const pokemon = usePokemon();
    const [fav, setFav] = useState(pokemon?.isFavorite || false);
    const [favoritePokemon, unFavoritePokemon] = usePokemonMutations();

    const handleFavourite = async () => {
        const mutation = fav ? unFavoritePokemon : favoritePokemon;
        try {
            mutation({
                variables: {
                    id: pokemon?.id
                }
            })
            setFav(prev => !prev)
            action(pokemon?.id!);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className='absolute text-accent bg-white rounded-full shadow-md shadow-primary/50 w-16 h-16 flex flex-col justify-center items-center left-8 md:right-[7rem] md:left-auto cursor-pointer hover:scale-105 active:scale-95 duration-100 bottom-0'
            onClick={handleFavourite}>
            {fav ? <FavoriteFilled className='text-red-500' size={32}/> : <Favorite className='text-red-500' size={32}/>}
        </div>
    );
};

export default FavouritePokemon;
