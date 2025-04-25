import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EventItem } from './eventsSlice'

type ModalState = {
  addOpen: boolean
  addEvent: EventItem | null
  viewOpen: boolean
  viewDate: string | null
}

const initialState: ModalState = {
  addOpen: false,
  addEvent: null,
  viewOpen: false,
  viewDate: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddDrawer: (state, action: PayloadAction<string | null>) => {
      state.addOpen = true
      const dateStr = action.payload
      state.addEvent = dateStr
        ? {
            id: '',
            title: '',
            start: dateStr,
            end: dateStr,
            startTime: undefined,
            endTime: undefined,
          }
        : null
    },
    openEditDrawer: (state, action: PayloadAction<EventItem>) => {
      state.addOpen = true
      state.addEvent = action.payload
    },
    closeAddDrawer: (state) => {
      state.addOpen = false
      state.addEvent = null
    },
    openViewDrawer: (state, action: PayloadAction<string>) => {
      state.viewOpen = true
      state.viewDate = action.payload
    },
    closeViewDrawer: (state) => {
      state.viewOpen = false
      state.viewDate = null
    },
  },
})

export const {
  openAddDrawer,
  openEditDrawer,
  closeAddDrawer,
  openViewDrawer,
  closeViewDrawer,
} = modalSlice.actions

export default modalSlice.reducer