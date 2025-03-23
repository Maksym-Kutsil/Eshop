import { configureStore } from '@reduxjs/toolkit'

import FilterSlice from './slices/FilterSlice'
import CartSlice from './slices/CartSlice'
import UserSlice from './slices/UserSlice'
import productsApi from './Api/ProductsApi'
import aboutApi from './Api/AboutApi'

export const store = configureStore({
  reducer: {
    filters: FilterSlice,
    cart: CartSlice,
    user: UserSlice,
    [productsApi.reducerPath] : productsApi.reducer,
    [aboutApi.reducerPath] : aboutApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware).concat(aboutApi.middleware)
})

export type TypeRoot = ReturnType<typeof store.getState>
export type TypeDispatch = typeof store.dispatch