import { createSlice } from "@reduxjs/toolkit";

export type TypeFilterState = {
    search: string,
    filter: string,
    order: string,
    sortBy: string,
    page: number
}

const initialState: TypeFilterState = {
    search: "",
    filter: "",
    order: "",
    sortBy: "",
    page: 1
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const { setSearch, setFilter, setOrder, setSortBy, setPage } = filterSlice.actions
export default filterSlice.reducer