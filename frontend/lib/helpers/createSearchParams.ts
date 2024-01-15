export const createQueryString = (name: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
        params.delete(name)
    } else {
        params.set(name, value)
    }

    return params.toString()
}

