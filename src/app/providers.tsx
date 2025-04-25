'use client'
import { PropsWithChildren, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { hydrateEvents } from '@/store/slices/eventsSlice'

export default function Providers({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    const raw = localStorage.getItem('events')
    if (raw) store.dispatch(hydrateEvents(JSON.parse(raw)))
    const unsub = store.subscribe(() =>
      localStorage.setItem('events', JSON.stringify(store.getState().events.items))
    )
    return unsub
  }, [])

  return <Provider store={store}>{children}</Provider>
}
