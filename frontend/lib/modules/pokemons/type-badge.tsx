import React from 'react';
import {PokemonTypesValue} from "@/lib/types";

const TypeBadge = ({type, size = 'normal'}: {
    type: PokemonTypesValue,
    size?: 'normal' | 'small';
}) => {
    const map: { [key in PokemonTypesValue]: string } = {
        Bug: 'bg-lime-500',
        Dark: 'bg-gray-800',
        Dragon: 'bg-indigo-500',
        Electric: 'bg-yellow-400',
        Fairy: 'bg-rose-500',
        Fighting: 'bg-red-700',
        Fire: 'bg-orange-500',
        Flying: 'bg-cyan-500',
        Ghost: 'bg-indigo-400',
        Grass: 'bg-green-700',
        Ground: 'bg-amber-800',
        Ice: 'bg-cyan-400',
        Normal: 'bg-orange-900',
        Poison: 'bg-purple-500',
        Psychic: 'bg-pink-400',
        Rock: 'bg-gray-400',
        Steel: 'bg-gray-600',
        Water: 'bg-blue-400',
    };

    return (
        <span className={`${map[type]} text-white w-fit rounded-md ${size === 'normal' ? 'px-1.5': 'px-1 text-sm'}`}>
            {type}
        </span>
    );
};

export default TypeBadge;
