'use client'
import React, { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MonthNavigator from '@/components/MonthNavigator'
import CalendarGrid from '@/components/CalendarGrid'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openAddDrawer, closeAddDrawer, closeViewDrawer } from '@/store/slices/modalSlice'
import ViewEventsDrawer from '@/components/Modals/ViewEventsDrawer'
import { EventDrawer } from '@/components/Modals/EventDrawer'

const Home: React.FC = () => {
  const [current, setCurrent] = useState(new Date())
  const dispatch = useAppDispatch()
  const { addOpen, addEvent, viewOpen, viewDate } = useAppSelector((s) => s.modal)

  const handleAdd = (date?: Date) => {
    dispatch(openAddDrawer(date ? date.toISOString() : null))
  }

  return (
    <NoSsr>
      <Box>
        <MonthNavigator date={current} onChange={setCurrent} />
        <CalendarGrid current={current} onAdd={handleAdd} />
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 32, right: 32 }}
          onClick={() => handleAdd()}
        >
          <AddIcon />
        </Fab>
        <EventDrawer open={addOpen} onClose={() => dispatch(closeAddDrawer())} initialEvent={addEvent} />
        <ViewEventsDrawer open={viewOpen} date={viewDate ? new Date(viewDate) : undefined} onClose={() => dispatch(closeViewDrawer())} />
      </Box>
    </NoSsr>
  )
}

export default Home
