'use client'
import React, { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CalendarGrid from '@/components/CalendarGrid'
import YearSelector from '@/components/Naviganion/YearSelector'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  openAddDrawer,
  closeAddDrawer,
  closeViewDrawer,
} from '@/store/slices/modalSlice'
import ViewEventsDrawer from '@/components/Modals/ViewEventsDrawer'
import { EventDrawer } from '@/components/Modals/EventDrawer'
import MonthNavigator from '@/components/Naviganion/MonthNavigator'

export default function Home() {
  const [current, setCurrent] = useState(new Date())
  const dispatch = useAppDispatch()
  const { addOpen, addEvent, viewOpen, viewDate } = useAppSelector(s => s.modal)

  const handleAdd = (date?: Date) => {
    dispatch(openAddDrawer(date?.toISOString() ?? null))
  }

  return (
    <NoSsr>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <MonthNavigator date={current} onChange={setCurrent} />
        <YearSelector currentDate={current} onChange={setCurrent} />
      </Box>

      <CalendarGrid current={current} onAdd={handleAdd} />

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={() => handleAdd()}
      >
        <AddIcon />
      </Fab>

      <EventDrawer
        open={addOpen}
        onClose={() => dispatch(closeAddDrawer())}
        initialEvent={addEvent}
      />
      <ViewEventsDrawer
        open={viewOpen}
        date={viewDate ? new Date(viewDate) : undefined}
        onClose={() => dispatch(closeViewDrawer())}
      />
    </NoSsr>
  )
}
