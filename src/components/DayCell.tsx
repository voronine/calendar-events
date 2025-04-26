import React, { MouseEvent } from 'react'
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

const DayCell: React.FC<DayCellProps> = React.memo(({ date, onAdd }) => {
  const dispatch = useAppDispatch()
  const isoDate = date.toISOString()
  const isFirstDay = date.getDate() === 1
  const isToday = date.toDateString() === new Date().toDateString()
  const cellClass = [styles.cell, isFirstDay && styles.firstDay]
    .filter(Boolean)
    .join(' ')
  const dateClass = [styles.date, isToday && styles.today]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    dispatch(openViewDrawer(isoDate))
  }

  const handleContext = (e: MouseEvent) => {
    e.preventDefault()
    dispatch(openAddDrawer(isoDate))
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
})

DayCell.displayName = 'DayCell'

export default DayCell
