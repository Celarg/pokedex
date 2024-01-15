'use client';

import React, {useRef} from 'react';
import {VolumeUpFilled} from "@carbon/icons-react";
import {usePokemon} from "@/lib/wrappers";

const PokemonAudio = () => {
    const pokemon = usePokemon();
    const ref = useRef<HTMLAudioElement>(null);

    const handlePlay = async () => {
        try {
            await ref.current?.play();
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div
            className='absolute text-accent bg-white rounded-full shadow-md shadow-primary/50 w-16 h-16 flex flex-col justify-center items-center right-8 cursor-pointer hover:scale-105 active:scale-95 duration-100 bottom-0'
            onClick={handlePlay}>
            <VolumeUpFilled size={32}/>
            <button className='text-sm'>Play</button>
            <audio id="myAudio" ref={ref}>
                <source src={pokemon?.sound} type="audio/mpeg"/>
            </audio>
        </div>
    );
};

export default PokemonAudio;
