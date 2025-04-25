// components/DayCell.tsx
'use client'
import React from 'react'
import { useAppDispatch } from '@/store/hooks'
import {
  openViewDrawer,
  openAddDrawer,
  openEditDrawer,
} from '@/store/slices/modalSlice'
import EventList, { EventType } from './EventList'
import styles from './CalendarGrid.module.css'

interface DayCellProps {
  date: Date
  onAdd?: (date: Date) => void
}

export default function DayCell({ date, onAdd }: DayCellProps) {
  const dispatch = useAppDispatch()
  const isFirstDay = date.getDate() === 1
  const isToday = date.toDateString() === new Date().toDateString()
  const cellClass = [
    styles.cell,
    isFirstDay && styles.firstDay,
  ].filter(Boolean).join(' ')
  const dateClass = [
    styles.date,
    isToday && styles.today,
  ].filter(Boolean).join(' ')

  const handleClick = () => {
    dispatch(openViewDrawer(date.toISOString()))
  }

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(openAddDrawer(date.toISOString()))
    onAdd?.(date)
  }

  const handleEdit = (item: EventType) => {
    dispatch(openEditDrawer(item))
  }

  return (
    <div
      className={cellClass}
      onClick={handleClick}
      onContextMenu={handleContext}
    >
      <span className={dateClass}>{date.getDate()}</span>
      <EventList date={date} onEdit={handleEdit} />
    </div>
  )
}
