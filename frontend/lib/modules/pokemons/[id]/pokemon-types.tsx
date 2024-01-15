import React, {Fragment} from 'react';
import {PokemonTypesValue} from "@/lib/types";
import {useRouter} from "next/navigation";
import {ROUTES} from "@/lib/constants";
import {createQueryString} from "@/lib/helpers";
import TypeBadge from "@/lib/modules/pokemons/type-badge";

type PokemonTypesProps = {
    types: PokemonTypesValue[];
}

const PokemonTypes = ({types}: PokemonTypesProps) => {
    const router = useRouter()

    const handlePokemonTypeClick = (type: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        const value = type.slice(0, 1).toLowerCase() + type.slice(1)
        router.push(ROUTES.HOME + '?' + createQueryString('type', value))
    }

    return (
        <>
            {types.map((type: PokemonTypesValue) =>
                <Fragment key={type}>
                    <span className={'hover:scale-105 transition-all'} onClick={handlePokemonTypeClick(type)}><TypeBadge type={type}/></span>
                </Fragment>
            )}
        </>
    );
};

export default PokemonTypes;
