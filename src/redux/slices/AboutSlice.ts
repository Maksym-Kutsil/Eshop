import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TypeProduct } from '../../Types/types'

export type TypeAboutState = {
    about : TypeProduct | null,
    status: "loading" | "error" | "success"
}

export const fetchAbout = createAsyncThunk(
    'products/fetcAboutStatus',
    async (id : string) => {
      const res = await axios.get(`${import.meta.env.VITE_API}/${id}`)
      return res.data
    },
)

const initialState : TypeAboutState = { 
    about : null,
    status : "loading"
} 

const AboutSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAbout: (state, action) => {
      state.about = action.payload
      state.status = "success"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAbout.pending, (state) => {
      state.about = null
      state.status = "loading"
    })
    builder.addCase(fetchAbout.rejected, (state) => {
      state.about = null
      state.status = "error"
    })
    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      state.about = action.payload
      state.status = "success"
    })
  }
})

export const { setAbout } = AboutSlice.actions
export default AboutSlice.reducer