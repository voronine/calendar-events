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

interface EventListProps {
  date: Date
  onEdit: (event: EventType) => void
}

const EventList: React.FC<EventListProps> = React.memo(({ date, onEdit }) => {
  const items = useAppSelector(s => s.events.items)
  const events = useMemo(
    () => items.filter(e => iso(new Date(e.start)) === iso(date)),
    [items, date]
  )

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
})

export default EventList