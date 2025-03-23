import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TypeProduct } from '../../Types/types'

export type TypeProductsState = {
    products : TypeProduct[],
    status: "loading" | "error" | "success"
}

type fetchProductParams = {
  search: string
  filter: string,
  order: string,
  sortBy: string,
  page: number,
  limit: number
}

export const fetchProducts = createAsyncThunk(
    'products/fetcProductsStatus',
    async (params: fetchProductParams) => {
      const { search, filter, order, sortBy, page, limit } = params
      
      const res = await axios.get(`${import.meta.env.VITE_API}?title=${search}&category=${filter}&order=${order}&sortBy=${sortBy}&page=${page}&limit=${limit}`)
      return res.data
    },
)

const initialState : TypeProductsState = { 
    products : [],
    status : "loading"
} 

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = []
      state.status = "loading"
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.products = []
      state.status = "error"
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.status = "success"
    })
  }
})

export const { } = ProductSlice.actions
export default ProductSlice.reducer