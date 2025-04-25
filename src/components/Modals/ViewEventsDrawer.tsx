'use client'
import { Drawer, Stack, Button } from '@mui/material'
import { useAppDispatch } from '@/store/hooks'
import { closeViewDrawer } from '@/store/slices/modalSlice'
import EventList from '../EventList'
import NoSsr from '@mui/material/NoSsr'

type Props = { open: boolean; onClose: () => void; date?: Date }

export default function ViewEventsDrawer({ open, onClose, date }: Props) {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeViewDrawer())
    onClose()
  }

  return (
    <NoSsr defer>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Stack spacing={2} sx={{ width: 320, p: 3 }}>
          {date && <EventList date={date} />}
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Drawer>
    </NoSsr>
  )
}
