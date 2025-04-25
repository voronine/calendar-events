'use client'
import React from 'react'
import { Drawer, Stack, Button } from '@mui/material'
import NoSsr from '@mui/material/NoSsr'
import { useAppDispatch } from '@/store/hooks'
import { openAddDrawer, openEditDrawer, closeViewDrawer } from '@/store/slices/modalSlice'
import EventList, { EventType } from '../EventList'

type ViewEventsDrawerProps = {
  open: boolean
  date?: Date
  onClose: () => void
}

const ViewEventsDrawer: React.FC<ViewEventsDrawerProps> = ({ open, date, onClose }) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(closeViewDrawer())
    onClose()
  }

  const handleAdd = (d?: Date) => {
    dispatch(openAddDrawer(d ? d.toISOString() : null))
    handleClose()
  }

  const handleEdit = (ev: EventType) => {
    dispatch(openEditDrawer(ev))
    handleClose()
  }

  return (
    <NoSsr defer>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: 320, p: 3 }}>
          {date && (
            <>
              <EventList date={date} onEdit={handleEdit} />
              <Button fullWidth variant="contained" onClick={() => handleAdd(date)}>
                Add
              </Button>
            </>
          )}
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Drawer>
    </NoSsr>
  )
}

export default ViewEventsDrawer