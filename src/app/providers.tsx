'use client'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { hydrateEvents } from '@/store/slices/eventsSlice'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const raw = localStorage.getItem('events')
    if (raw) {
      store.dispatch(hydrateEvents(JSON.parse(raw)))
    }
    const unsubscribe = store.subscribe(() => {
      localStorage.setItem(
        'events',
        JSON.stringify(store.getState().events.items)
      )
    })
    return unsubscribe
  }, [])

  return <Provider store={store}>{children}</Provider>
}
