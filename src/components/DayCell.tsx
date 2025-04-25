// components/DayCell.tsx
'use client'
import React from 'react'
import { useAppDispatch } from '@/store/hooks'
import { openEditDrawer, openAddDrawer, openViewDrawer } from '@/store/slices/modalSlice'
import EventList, { EventType } from './EventList'
import styles from './CalendarGrid.module.css'

type Props = {
  date: Date
  onAdd: (d?: Date) => void
}

export default function DayCell({ date, onAdd }: Props) {
  const dispatch = useAppDispatch()
  const isFirst = date.getDate() === 1
  const isToday = date.toDateString() === new Date().toDateString()
  const cellClass = `${styles.cell}${isFirst ? ` ${styles.firstDay}` : ''}`
  const dateClass = `${styles.date}${isToday ? ` ${styles.today}` : ''}`

  const handleCellClick = () =>
    dispatch(openViewDrawer(date.toISOString()))

  const handleEdit = (ev: EventType) =>
    dispatch(openEditDrawer(ev))

  return (
    <div
      className={cellClass}
      onClick={handleCellClick}
      onContextMenu={e => {
        e.preventDefault()
        dispatch(openAddDrawer(date.toISOString()))
        onAdd(date)
      }}
    >
      <span className={dateClass}>{date.getDate()}</span>
      <div onClick={e => e.stopPropagation()}>
        <EventList date={date} onEdit={handleEdit} />
      </div>
    </div>
  )
}
