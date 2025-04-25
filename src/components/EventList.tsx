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

type EventListProps = {
  date: Date
  onEdit: (event: EventType) => void
}

export default function EventList({ date, onEdit }: EventListProps) {
  const items = useAppSelector(s => s.events.items)
  const events = useMemo(() => {
    return items
      .filter(e => iso(new Date(e.start)) === iso(date))
      .sort((a, b) => {
        const tA = a.startTime
          ? new Date(a.startTime).getTime()
          : new Date(a.start).getTime()
        const tB = b.startTime
          ? new Date(b.startTime).getTime()
          : new Date(b.start).getTime()
        return tA - tB
      })
  }, [items, date])

  return (
    <div className={styles.events}>
      {events.map(ev => (
        <div key={ev.id} onClick={e => e.stopPropagation()}>
          <EventItem
            title={ev.title}
            start={ev.start}
            onClick={() => onEdit(ev)}
          />
        </div>
      ))}
    </div>
  )
}
