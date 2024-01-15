"use client";

import React, {useState} from 'react';
import {SelectField, TextFilter} from "@/lib/ui";
import {POKEMON_TYPES, VIEW_MODES} from "@/lib/constants";
import {createQueryString} from "@/lib/helpers";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounceFn} from "@/lib/hooks/use-debounce";
import {ViewMode} from "@/lib/types";
import {List, Thumbnail_2} from "@carbon/icons-react";

type FiltersProps = {
    loading?: boolean;
    refetch: (isFavorite: boolean | null) => void;
}

const Filters = ({loading = false, refetch}: FiltersProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const viewMode = searchParams.get('view') ?? VIEW_MODES.GRID;
    const searchType = searchParams.get('type') ?? ''
    const [searchFilter, setSearchFilter] = useState(searchParams.get('q') ?? '')
    const [showAll, setShowAll] = useState(() => {
        if (!searchParams.get('showAll')) return true;
        return searchParams.get('showAll') === 'true'
    })


    const handleChangeFilter = (value: string) => {
        setSearchFilter(value);
        debouncedSetSearchFilterParam(value);
    }

    const debouncedSetSearchFilterParam = useDebounceFn((value: string) => {
        router.push(pathname + '?' + createQueryString('q', value))
    }, 500)

    const handleChangeType = (value: string) => {
        router.push(pathname + '?' + createQueryString('type', value))
    }

    const handleFavoriteClick = (value: boolean) => () => {
        setShowAll(value);
        router.push(pathname + '?' + createQueryString('showAll', String(value)))
        refetch(value ? null : true);
    }

    const handleViewModeClick = (value: ViewMode) => () => {
        router.push(pathname + '?' + createQueryString('view', value))
    }

    return (
        <div className='gap-4 grid pt-10 pb-5 md:flex md:gap-4 md:mx-auto  '>
            <TextFilter value={searchFilter} onChange={handleChangeFilter} loading={loading}/>
            <SelectField value={searchType} onChange={handleChangeType} values={POKEMON_TYPES}/>
            <div className='grid sm:flex gap-4 '>
                <div
                    className='flex justify-center items-center basis-1/5 border-primary border-2 border-solid rounded-md w-600 shrink-0 cursor-pointer'>
                    <div
                        onClick={handleFavoriteClick(true)}
                        className={`w-full sm:w-32  py-1.5 flex h-full items-center justify-center ${showAll ? 'bg-primary text-white ' : 'text-accent hover:bg-primary/75 hover:text-white/90 '} font-bold transition-all`}>
                        All
                    </div>
                    <div
                        onClick={handleFavoriteClick(false)}
                        className={`w-full sm:w-32  py-1.5 flex h-full items-center justify-center ${!showAll ? 'bg-primary text-white ' : 'text-accent hover:bg-primary/75 hover:text-white/90 '} font-bold transition-all`}>
                        Favourites
                    </div>
                </div>
                <div
                    className='flex justify-center items-center border-primary border-2 border-solid rounded-md w-600 shrink-0 cursor-pointer'>
                    <div
                        onClick={handleViewModeClick(VIEW_MODES.GRID)}
                        className={`w-full py-1.5 flex px-4 h-full items-center justify-center ${viewMode === VIEW_MODES.GRID ? 'bg-primary text-white ' : 'text-accent hover:bg-primary/75 hover:text-white/90 '} font-bold transition-all`}>
                        <Thumbnail_2 size={24}/>
                    </div>
                    <div
                        onClick={handleViewModeClick(VIEW_MODES.LIST)}
                        className={`w-full py-1.5 flex px-4 h-full items-center justify-center ${viewMode === VIEW_MODES.LIST ? 'bg-primary text-white ' : 'text-accent hover:bg-primary/75 hover:text-white/90 '} font-bold transition-all`}>
                        <List size={24}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
