import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API}` }),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ searchValue = "", filter = "", order = "", sortBy = "", page = 1, limit = 8 }) => {
                
                const params = new URLSearchParams({
                    title: searchValue,
                    category: filter,
                    order,
                    sortBy,
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();

                return `?${params}`;
            },
        }),
    }),
});

export default productsApi;
export const { useGetProductsQuery } = productsApi;
