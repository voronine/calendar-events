'use client'
import React from 'react'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import NoSsr from '@mui/material/NoSsr'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { useAppDispatch } from '@/store/hooks'
import { openAddDrawer, openEditDrawer, closeViewDrawer } from '@/store/slices/modalSlice'
import EventList, { EventType } from '../EventList'

type ViewEventsDrawerProps = {
  open: boolean
  date?: Date
  onClose: () => void
}

const Root = styled(Stack)(({ theme }) => ({
  width: 320,
  height: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
}))

const Header = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const Content = styled(Stack)(() => ({
  flexGrow: 1,
}))

const Footer = styled(Stack)(() => ({
  flexDirection: 'row',
}))

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
        <Root>
          <Header>
            <Typography variant="h6">List Events</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Header>

          <Content spacing={2}>
            {date && <EventList date={date} onEdit={handleEdit} />}
          </Content>

          <Footer spacing={2}>
            {date && (
              <Button fullWidth variant="contained" onClick={() => handleAdd(date)}>
                Add
              </Button>
            )}
            <Button fullWidth variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Footer>
        </Root>
      </Drawer>
    </NoSsr>
  )
}

export default ViewEventsDrawer
