'use client'
import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { iso } from '@/lib/date'
import styles from './CalendarGrid.module.css'
import EventItem from './EventItem'

type Props = { date: Date }

export default function EventList({ date }: Props) {
  const items = useAppSelector(s => s.events.items)
  const events = useMemo(
    () => items.filter(e => iso(new Date(e.start)) === iso(date)),
    [items, date]
  )

  return (
    <div className={styles.events}>
      {events.map(ev => (
        <EventItem key={ev.id} {...ev} />
      ))}
    </div>
  )
}
