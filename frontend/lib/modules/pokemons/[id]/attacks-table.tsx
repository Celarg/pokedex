import React from 'react';
import {Attack, Pokemon} from "@/lib/api/gql/graphql";

type AttacksTableProps = {
    pokemon: Pokemon;
}

const AttacksTable = ({pokemon}: AttacksTableProps) => {
    const fastAttacks = [...pokemon.attacks.fast].sort((a, b) => a.damage - b.damage);
    const specialAttacks = [...pokemon.attacks.special].sort((a, b) => a.damage - b.damage);

    return (
        <section id='attacks' className='px-4 w-full md:px-0 attacks sm:w-[600px] mx-auto lg:w-full'>
            <h3 className='text-3xl text-accent font-bold mb-2 text-center'>
                Attacks
            </h3>
            <table className='w-full'>
                <thead>
                <tr className='[&>th]:font-bold text-accent'>
                    <th>
                    </th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Damage</th>
                </tr>
                </thead>
                <tbody>
                {fastAttacks.map((attack) => (
                    <AttackRow key={attack.name} attack={attack} symbol='F'/>
                ))}
                {specialAttacks.map((attack) => (
                    <AttackRow key={attack.name} attack={attack} symbol='S'/>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={4} className='text-center text-sm font bold'>
                        <div
                            className='text-[0.75rem] text-accent inline-flex gap-2 align-middle items-center flex-wrap justify-center pt-2'>
                            <div
                                className='bg-quaternary text-white rounded-full  w-4 h-4 font-bold flex items-center justify-center'>
                                F
                            </div>
                            stands for
                            <div
                                className='bg-quaternary text-white rounded-full px-1 font-bold flex items-center justify-center'>
                                Fast Attack
                            </div>
                            <span className='hidden sm:block'>and</span>
                            <div className='flex gap-1.5 items-center'>
                                <div
                                    className='bg-yellow-500 rounded-full w-4 h-4 font-bold flex items-center justify-center'>
                                    S
                                </div>
                                stands for
                                <div
                                    className='bg-yellow-500 rounded-full px-1 font-bold flex items-center justify-center'>
                                    Special Attack
                                </div>
                            </div>

                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </section>
    );
};

type AttackRowProps = {
    attack: Attack;
    symbol: 'F' | 'S';
}

const AttackRow = ({attack, symbol}: AttackRowProps) => {
    const map = {
        F: {
            color: 'quaternary',
            text: 'F'
        },
        S: {
            color: 'yellow-500',
            text: 'S'
        }
    }

    return <tr key={attack.name}>
        <td>
            <div
                className={`bg-${map[symbol].color} text-white rounded-full w-5 h-5 font-bold flex items-center justify-center`}>
                {map[symbol].text}
            </div>
        </td>
        <td className='text-center'>{attack.name}</td>
        <td className='text-center'>{attack.type}</td>
        <td className='text-center'>{attack.damage}</td>
    </tr>
};

export default AttacksTable;
