import React from 'react';
import {Loading} from "@carbon/react";
import {Search} from "@carbon/icons-react";

type TextFilterProps = {
    value: string;
    onChange: (value: string) => void;
    loading?: boolean;
}

const TextFilter = ({onChange, value, loading=false}: TextFilterProps) => {
    // @ts-ignore
    return (
        <div className='relative md:basis-3/5'>
            <input className='border pl-10 w-full rounded-md border-green-800 px-3.5 py-1.5 text-[18px]'
                   placeholder={`Pokemon's name...`} value={value} onChange={e => onChange(e.target.value)}/>
            <Search className='absolute inset-0 my-auto left-2' size={28}/>
            {loading && <Loading className='absolute right-2.5 top-3' small={true} withOverlay={false} />}
        </div>
    );
};

export default TextFilter;
