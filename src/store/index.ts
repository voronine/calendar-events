import { configureStore, createAction } from '@reduxjs/toolkit'
import eventsReducer, { EventItem } from './slices/eventsSlice'
import modalReducer from './slices/modalSlice'

export const hydrateEvents = createAction<EventItem[]>('events/hydrate')

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
