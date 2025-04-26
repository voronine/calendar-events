'use client'
import React, { useState } from 'react'
import NoSsr from '@mui/material/NoSsr'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import CalendarGrid from '@/components/CalendarGrid'
import YearSelector from '@/components/Naviganion/YearSelector'
import MonthNavigator from '@/components/Naviganion/MonthNavigator'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { openAddDrawer, closeAddDrawer, closeViewDrawer } from '@/store/slices/modalSlice'
import ViewEventsDrawer from '@/components/Modals/ViewEventsDrawer'
import { EventDrawer } from '@/components/Modals/EventDrawer'

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}))

const CreateFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
}))

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const dispatch = useAppDispatch()
  const { addOpen, addEvent, viewOpen, viewDate } = useAppSelector(s => s.modal)

  const handleAdd = (date?: Date) => {
    dispatch(openAddDrawer(date?.toISOString() ?? null))
  }

  return (
    <NoSsr>
      <HeaderContainer>
        <MonthNavigator date={currentDate} onChange={setCurrentDate} />
        <YearSelector currentDate={currentDate} onChange={setCurrentDate} />
      </HeaderContainer>

      <CalendarGrid current={currentDate} onAdd={handleAdd} />

      <CreateFab color="primary" onClick={() => handleAdd()}>
        <AddIcon />
      </CreateFab>

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

export default Home