'use client';

import React, {useState} from 'react';
import {Pokemon} from "@/lib/api/gql/graphql";
import Image from "next/image";
import {usePokemon} from "@/lib/wrappers";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/lib/constants";

const ID = 'pokemon-evolution-gallery';

const EvolutionTracker = () => {
    const pokemon = usePokemon();
    const router = useRouter();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(pokemon?.evolutions?.[0] || pokemon || null);

    if (!pokemon || !pokemon?.evolutions.length || !selectedPokemon) return <></>;

    const handleSelectedPokemonClick = (clickedPokemon: Pokemon) => {
        if (clickedPokemon.id === selectedPokemon.id) return;
        if (clickedPokemon.id === pokemon.id) {
            document.getElementById(ID)!.style.transform = 'translateX(0)';
            setSelectedPokemon(pokemon)
            return;
        }
        setSelectedPokemon(clickedPokemon)
        let index = pokemon.evolutions.findIndex((evolution) => evolution.id === clickedPokemon.id);
        index++;
        document.getElementById(ID)!.style.transform = `translateX(-${index * 160}px)`;
    }

    const handlePokemonRouting = () => {
        if (selectedPokemon.id === pokemon.id) return;
        router.push(`${ROUTES.HOME}/${selectedPokemon.id}`)
    }

    return (
        <section className='flex flex-col items-center gap-4 w-full evolutions'>
            <h3 className='text-3xl text-accent font-bold text-center'>
                Evolutions
            </h3>
            <div>
                <div className='mx-auto overflow-hidden w-40'>
                    <div className='flex flex-nowrap transition-all -translate-x-[160px] duration-500 cursor-pointer' id={ID} onClick={handlePokemonRouting}>
                        <Image src={pokemon.image} alt={pokemon.name} width={200} height={200}
                               className='mx-auto mb-4 w-40 flex-shrink-0 h-40 object-contain'/>
                        {pokemon.evolutions.map((evolution) => (
                            <Image src={evolution.image} key={evolution.name} alt={evolution.name} width={200}
                                   height={200}
                                   className='mx-auto mb-4 flex-shrink-0 w-40 h-40 object-contain'/>
                        ))}
                    </div>
                </div>
                <div
                    className='w-full mx-auto flex flex-row gap-2 flex-nowrap justify-center overflow-auto px-4  '>
                    <SmallPokemonCard pokemon={pokemon} current={true} selected={selectedPokemon.id === pokemon.id}
                                      onClick={() => handleSelectedPokemonClick(pokemon)}/>
                    {pokemon.evolutions.map((evolution) => (
                        <SmallPokemonCard
                            onClick={() => handleSelectedPokemonClick(evolution)}
                            pokemon={evolution} key={evolution.id} selected={selectedPokemon.id === evolution.id}/>
                    ))}

                </div>
            </div>
            <div>
                <h4 className='text-xl text-accent font-bold mb-2 text-center'>
                    Next evolution requirements
                </h4>
                <div className='flex flex-col items-center'>
                    <p className='text-2xl bg-quaternary px-1.5 rounded-md text-tertiary mb-10 font-bold text-center'>
                        {pokemon.evolutionRequirements?.amount}x&nbsp;{pokemon.evolutionRequirements?.name}
                    </p>
                </div>
            </div>
        </section>
    );
};

type SmallPokemonCardProps = {
    pokemon: Pokemon;
    current?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

const SmallPokemonCard = ({pokemon, current = false, selected = false, onClick}: SmallPokemonCardProps) => {
    return <div
        onClick={onClick}
        className={
            `flex active:scale-95 cursor-pointer active:duration-100 flex-col items-center my-3 relative border-solid py-1 w-fit min-w-24 transition-all duration-[0.5s] rounded-md border-2 ${selected ? ' border-primary' : 'border-primary/0'} `
        }>
        <Image
            src={pokemon.image} alt={pokemon.name} width={200} height={200}
            className='mx-auto mb-1 w-14 h-14 object-contain'
        />
        <p className='text-sm text-primary font-bold text-center'>
            {pokemon.name}
        </p>
        {current &&
            <p className='bg-quaternary w-fit absolute -bottom-2.5 left-0 right-0 mx-auto text-[0.65rem] rounded-md px-0.5 py-0.25 text-tertiary'>
                Current
            </p>}
    </div>
}

export default EvolutionTracker;
