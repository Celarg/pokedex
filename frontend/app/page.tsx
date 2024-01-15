import React, {Suspense} from "react";
import {RandomPokemons, SearchBar} from "@/lib/modules/home";
import {MainPageBlockCardSkeletonLoading} from "@/lib/modules/pokemons";

export const revalidate = 86400;

export default function Home() {

    return (
        <main className='w-full h-auto self-center flex flex-col md:justify-center px-4 py-10 my-auto max-w-[1280px] mx-auto'>
            <h1 className='text-6xl mb-10 font-bold text-center text-accent/90'>
                Pokédex
            </h1>
            <SearchBar/>
            <div
                className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-10 place-items-center pb-20 md:w-fit md:mx-auto xl:mx-8 xl:w-auto'>
                <Suspense fallback={<>
                    {[...Array(2)].map((_, i) => (<MainPageBlockCardSkeletonLoading key={i}/>))}
                </>}>
                    <RandomPokemons/>
                </Suspense>
            </div>
        </main>
    )
}
