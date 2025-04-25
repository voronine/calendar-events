import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ModalState = {
  addOpen: boolean
  addDate: string | null
  viewOpen: boolean
  viewDate: string | null
}

const initialState: ModalState = {
  addOpen: false,
  addDate: null,
  viewOpen: false,
  viewDate: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddDrawer: (state, action: PayloadAction<string | null>) => {
      state.addOpen = true
      state.addDate = action.payload
    },
    closeAddDrawer: state => {
      state.addOpen = false
      state.addDate = null
    },
    openViewDrawer: (state, action: PayloadAction<string>) => {
      state.viewOpen = true
      state.viewDate = action.payload
    },
    closeViewDrawer: state => {
      state.viewOpen = false
      state.viewDate = null
    },
  },
})

export const {
  openAddDrawer,
  closeAddDrawer,
  openViewDrawer,
  closeViewDrawer,
} = modalSlice.actions

export default modalSlice.reducer
