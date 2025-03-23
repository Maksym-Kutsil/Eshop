import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypeProduct } from '../../Types/types'

const aboutApi = createApi({
    reducerPath: 'aboutApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API}` }),
    endpoints: (build) => ({
        getAbout: build.query<TypeProduct, string>({
            query: (id : string) => `/${id}`
        })
    })
})

export default aboutApi
export const { useGetAboutQuery } = aboutApi