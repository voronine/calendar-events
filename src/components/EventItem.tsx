import { format } from 'date-fns'
import { EventItem as Item } from '@/store/slices/eventsSlice'
import styles from './EventItem.module.css'

export default function EventItem({ title, start }: Item) {
  return (
    <div className={styles.item}>
      <div className={styles.date}>{format(new Date(start), 'dd.MM')}</div>
      <div className={styles.title}>{title}</div>
    </div>
  )
}
