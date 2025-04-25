import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uid } from 'uuid'

export type EventItem = {
  id: string
  title: string
  start: string
  end: string
  startTime?: string
  endTime?: string
}

type EventsState = { items: EventItem[] }
const initialState: EventsState = { items: [] }

export const hydrateEvents = createAction<EventItem[]>('events/hydrate')

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, { payload }: PayloadAction<Omit<EventItem, 'id'>>) {
      state.items.push({ ...payload, id: uid() })
    }
  },
  extraReducers: builder =>
    builder.addCase(hydrateEvents, (state, { payload }) => {
      state.items = payload
    })
})

export const { addEvent } = eventsSlice.actions
export default eventsSlice.reducer
