'use client'
import React from 'react'
import { useAppDispatch } from '@/store/hooks'
import {
  openAddDrawer,
  openEditDrawer,
  openViewDrawer,
} from '@/store/slices/modalSlice'
import EventList, { EventType } from './EventList'
import styles from './CalendarGrid.module.css'

type DayCellProps = {
  date: Date
  onAdd?: (date: Date) => void
}

export default function DayCell({ date, onAdd }: DayCellProps) {
  const dispatch = useAppDispatch()
  const isFirstDay = date.getDate() === 1
  const isToday = date.toDateString() === new Date().toDateString()
  const containerClass = `${styles.cell}${
    isFirstDay ? ` ${styles.firstDay}` : ''
  }`
  const dateClass = `${styles.date}${isToday ? ` ${styles.today}` : ''}`

  function handleView() {
    dispatch(openViewDrawer(date.toISOString()))
  }

  function handleContext(e: React.MouseEvent) {
    e.preventDefault()
    dispatch(openAddDrawer(date.toISOString()))
    onAdd?.(date)
  }

  function handleEdit(event: EventType) {
    dispatch(openEditDrawer(event))
  }

  return (
    <div
      className={containerClass}
      onClick={handleView}
      onContextMenu={handleContext}
    >
      <span className={dateClass}>{date.getDate()}</span>
      <EventList date={date} onEdit={handleEdit} />
    </div>
  )
}
