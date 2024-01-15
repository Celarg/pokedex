import React from 'react';
import {Pokemon} from "@/lib/api/gql/graphql";

type PokemonStatsProps = {
    pokemon: Pokemon;
}

const PokemonStats = ({pokemon}: PokemonStatsProps) => {
    return (
        <section id='stats' className='px-4 basis-1/2'>
            <h3 className='text-3xl text-white font-bold mb-2 text-center'>
                Basic Stats
            </h3>
            <div className='grid grid-cols-6 text-white items-center mb-2'>
                <div className='text-center'>
                    <p>
                        HP
                    </p>
                    <p>
                        CP
                    </p>
                </div>
                <div className='col-span-4 grid gap-4'>
                    <div className='bg-green-800 rounded-lg h-2 w-full'/>
                    <div className='bg-blue-800  rounded-lg h-2 w-full'/>
                </div>
                <div className='text-center'>
                    <p>
                        {pokemon.maxHP}
                    </p>
                    <p>
                        {pokemon.maxCP}
                    </p>
                </div>
            </div>
            <div
                className='grid [&_span]:font-semibold  [&_span]:text-sm  [&_span]:text-white [&_p]:text-white
                py-1.5 rounded-md border-solid grid-cols-3 gap-4 [&_p]:text-md  [&>div]:flex [&>div]:flex-col  [&>div]:gap-1.5 [&>div]:items-center [&_p]:text-center [&_p]:leading-4 '>
                <div className=''>
                    <span >
                    Size
                    </span>
                    <p>
                        {pokemon.height.minimum} <br/>-<br/> {pokemon.height.maximum}
                    </p>
                </div>
                <div >
                       <span >
                    Weight
                    </span>
                    <p>
                        {pokemon.weight.minimum} <br/>-<br/> {pokemon.weight.maximum}
                    </p>
                </div>
                <div >
                      <span >
                   Flee Rate
                    </span>
                    <p className='my-auto'>
                        {pokemon.fleeRate}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PokemonStats;
