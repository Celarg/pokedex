import React from 'react';
import {Pokemon} from "@/lib/api/gql/graphql";
import TypeBadge from "@/lib/modules/pokemons/type-badge";
import {PokemonTypesValue} from "@/lib/types";

type ResistantAndWeaknessProps = {
    pokemon: Pokemon;
}

const ResistantAndWeakness = ({pokemon}: ResistantAndWeaknessProps) => {

    return (
        <section className='px-4 '>
            {
                (pokemon.resistant.length || pokemon.weaknesses.length) && (
                    <div className='mb-2 flex flex-col sm:flex-row gap-4 '>
                        {renderTypeSection('Resistance', pokemon.resistant)}
                        <div className='my-2 w-0.5 shrink-0 h-auto bg-white hidden sm:block'/>
                        {renderTypeSection('Weaknesses', pokemon.weaknesses)}
                    </div>
                )
            }

        </section>
    );
};

function renderTypeSection(title:string, types:string[]) {
    if(!types.length) return null;

    return (
        <div className='w-full'>
            <p className={`text-xl text-white font-bold mb-0.5 text-left`}>
                {title}
            </p>
            <div className='flex flex-wrap gap-2'>
                {types.map(type => (
                    <TypeBadge type={type as PokemonTypesValue} key={type} />
                ))}
            </div>
        </div>
    );
}


export default ResistantAndWeakness;
