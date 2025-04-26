'use client'
import React from 'react'
import { Drawer, Stack, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
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
    dispatch(openAddDrawer(d?.toISOString() ?? null))
    handleClose()
  }
  const handleEdit = (ev: EventType) => {
    dispatch(openEditDrawer(ev))
    handleClose()
  }

  return (
    <NoSsr defer>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Stack
          sx={{
            width: 320,
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              List Events
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {date && (
              <EventList date={date} onEdit={handleEdit} large />
            )}
          </Stack>
          <Stack direction="row" spacing={2}>
            {date && (
              <Button fullWidth variant="contained" onClick={() => handleAdd(date)}>
                Add
              </Button>
            )}
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </NoSsr>
  )
}

export default ViewEventsDrawer
