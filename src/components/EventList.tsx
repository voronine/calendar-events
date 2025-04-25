// components/EventList.tsx
'use client'
import React, { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { iso } from '@/lib/date'
import EventItem from './EventItem'
import styles from './CalendarGrid.module.css'

export type EventType = {
  id: string
  title: string
  start: string
  end: string
  startTime?: string
  endTime?: string
}

type Props = {
  date: Date
  onEdit: (ev: EventType) => void
}

export default function EventList({ date, onEdit }: Props) {
  const items = useAppSelector(s => s.events.items)
  const events = useMemo(
    () => items.filter(e => iso(new Date(e.start)) === iso(date)),
    [items, date]
  )

  return (
    <div className={styles.events}>
      {events.map(ev => (
        <EventItem
          key={ev.id}
          title={ev.title}
          start={ev.start}
          onClick={() => onEdit(ev)}
        />
      ))}
    </div>
  )
}
