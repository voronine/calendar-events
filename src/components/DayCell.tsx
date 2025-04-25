'use client'
import { useAppDispatch } from '@/store/hooks'
import { openViewDrawer } from '@/store/slices/modalSlice'
import EventList from './EventList'
import styles from './CalendarGrid.module.css'

type Props = {
  date: Date
  onAdd: (d?: Date) => void
}

export default function DayCell({ date, onAdd }: Props) {
  const dispatch = useAppDispatch()
  const isFirst = date.getDate() === 1
  const isToday = date.toDateString() === new Date().toDateString()
  const cellCls = `${styles.cell} ${isFirst ? styles.firstDay : ''}`
  const dateCls = `${styles.date} ${isToday ? styles.today : ''}`

  return (
    <div
      className={cellCls}
      onClick={() => dispatch(openViewDrawer(date.toISOString()))}
      onContextMenu={e => {
        e.preventDefault()
        onAdd(date)
      }}
    >
      <span className={dateCls}>{date.getDate()}</span>
      <EventList date={date} />
    </div>
  )
}
