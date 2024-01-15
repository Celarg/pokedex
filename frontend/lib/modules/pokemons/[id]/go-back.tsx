'use client';

import React from 'react';
import {ArrowLeft} from "@carbon/icons-react";
import {useRouter} from "next/navigation";

const GoBackButton = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }


    return (
        <ArrowLeft size={24}
                   onClick={handleGoBack}
                   className='absolute transition-all cursor-pointer active:scale-95 left-4 md:left-12 top-0 bottom-0 my-auto p-1 rounded-full text-white bg-quaternary shadow-md shadow-quaternary/50 w-12 h-12'/>
    );
};

export default GoBackButton;
