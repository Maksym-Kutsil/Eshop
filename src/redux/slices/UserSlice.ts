import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    email: null,
    token: null,
    id: null,
 } 

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
       const { email, id, token } = action.payload
       state.email = email
       state.id = id
       state.token = token
    },
    removeUser: (state) => {
        state.email = null
        state.token = null
        state.id = null
    }
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer