'use client';

import React, {useState} from 'react';
import {Search} from "@carbon/icons-react";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/lib/constants";
import {useDebounceFn} from "@/lib/hooks/use-debounce";
import {createQueryString} from "@/lib/helpers";

const SearchBar = () => {
    const router = useRouter();

    const [search, setSearch] = useState('');

    const debouncedSearch = useDebounceFn((value:string)=>{
        router.push(`${ROUTES.HOME}?${createQueryString('q', value)}`)
    }, 500);

    const handleClick = () => {
        router.push(ROUTES.HOME);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    }


    return (
        <>
            <div className='relative self-center max-w-[35rem] w-full mx-4'>
                <input
                    value={search}
                    onChange={handleChange}
                    className='border-2 rounded-md max-w-[35rem] text-center w-full border-accent py-1.5 text-2xl px-10'
                    placeholder={`Start typing pokémon's name...`}/>
                <Search className='absolute inset-0 my-auto left-2' size={28}/>
            </div>
            <button
                onClick={handleClick}
                className='bg-primary text-white font-bold mt-2 w-fit px-3.5 py-1.5 rounded-md self-center transition-all hover:scale-105 hover:bg-accent'>
                Or show all pokemons
            </button>
        </>
    );
};

export default SearchBar;
