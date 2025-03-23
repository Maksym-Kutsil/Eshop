import { createSlice } from '@reduxjs/toolkit'
import { TypeCartItem } from '../../Types/types'

type TypeCart = {
  items: TypeCartItem[]
  isActive: boolean,
  popupIsActive: boolean,
  popupText: string
}

const initialState: TypeCart = {
  items: [],
  isActive: false,
  popupIsActive: false,
  popupText: ""
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.isActive = !state.isActive
    },
    addItem: (state, action) => {
      const item = action.payload
      const itemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id)

      if (itemIndex !== -1) {
        state.items[itemIndex].count++
      } else {
        state.items.unshift({ ...item, count: 1 })
      }
    },
    dellItem : (state, action) => {
      const productId = action.payload
      const itemIndex = state.items.findIndex((item : TypeCartItem) => item.id === productId)
      const item = state.items[itemIndex]
      if (itemIndex !== -1) {
        if (item.count === 1) {
          state.items.splice(itemIndex, 1)
        } else {
          state.items[itemIndex].count--
        }
      }
    },
    clearSingleItem : (state, action) => {
      const productId = action.payload
      const itemIndex = state.items.findIndex((item : TypeCartItem) => item.id === productId)
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1)
      }
    },
    clearItems : (state) => {
      state.items = []
    },
    setItems : (state, action) => {
      state.items = action.payload
    },
    setPopup : (state) => {
      state.popupIsActive = !state.popupIsActive
    },
    setPopupText : (state, action) => {
      state.popupText = action.payload
    }
  }
})

export const { toggleActive, addItem, dellItem, clearSingleItem, clearItems, setItems, setPopup, setPopupText } = cartSlice.actions
export default cartSlice.reducer