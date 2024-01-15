'use server'

import {revalidateTag} from 'next/cache'

export default async function action(id:string) {
    //revalidate detail page
    revalidateTag(`pokemon-detail/${id}`)
}
