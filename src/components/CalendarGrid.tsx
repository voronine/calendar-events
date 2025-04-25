'use client'
import React from 'react'
import { daysInMonth } from '@/lib/date'
import DayCell from './DayCell'
import styles from './CalendarGrid.module.css'

type Props = {
  current: Date
  onAdd: (date?: Date) => void
}

const CalendarGrid: React.FC<Props> = ({ current, onAdd }) => {
  const days = daysInMonth(current)

  return (
    <div className={styles.grid}>
      {days.map(date => (
        <DayCell
          key={date.toISOString()}
          date={date}
          onAdd={onAdd}
        />
      ))}
    </div>
  )
}

export default CalendarGrid
