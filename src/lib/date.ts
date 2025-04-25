import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'

export const daysInMonth = (d: Date) =>
  eachDayOfInterval({ start: startOfMonth(d), end: endOfMonth(d) })

export const iso = (d: Date) => format(d, 'yyyy-MM-dd')
