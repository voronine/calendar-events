'use client'
import { useState } from 'react'
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MonthNavigator from '@/components/MonthNavigator'
import CalendarGrid from '@/components/CalendarGrid'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  openAddDrawer,
  closeAddDrawer,
  closeViewDrawer,
} from '@/store/slices/modalSlice'
import EventDrawer from '@/components/Modals/EventDrawer'
import ViewEventsDrawer from '@/components/Modals/ViewEventsDrawer'

export default function Home() {
  const [current, setCurrent] = useState(new Date())
  const dispatch = useAppDispatch()
  const { addOpen, addDate, viewOpen, viewDate } = useAppSelector(s => s.modal)

  const openDrawer = (d?: Date) => {
    dispatch(openAddDrawer(d ? d.toISOString() : null))
  }

  return (
    <Box sx={{ p: 2 }}>
      <MonthNavigator date={current} onChange={setCurrent} />
      <CalendarGrid current={current} onAdd={openDrawer} />
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => openDrawer()}
      >
        <AddIcon />
      </Fab>
      <EventDrawer
        open={addOpen}
        onClose={() => dispatch(closeAddDrawer())}
        initialDate={addDate ? new Date(addDate) : undefined}
      />
      <ViewEventsDrawer
        open={viewOpen}
        onClose={() => dispatch(closeViewDrawer())}
        date={viewDate ? new Date(viewDate) : undefined}
      />
    </Box>
  )
}
