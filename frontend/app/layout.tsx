import type {Metadata} from 'next'
import {Tektur} from 'next/font/google'
import {MainWrapper} from "@/lib/wrappers";
import {PropsWithChildren} from "react";
import './index.scss';

export const metadata: Metadata = {
    title: 'Pokedex',
    description: 'Created by @Celarg',
}

const tektur = Tektur({subsets: ['latin']})

const RootLayout = ({children}: PropsWithChildren) => {
    return (
        <html lang="en">
        <body className={`${tektur.className} mx-auto`}>
        <MainWrapper>
            {children}
        </MainWrapper>
        </body>
        </html>
    )
}

export default RootLayout;
