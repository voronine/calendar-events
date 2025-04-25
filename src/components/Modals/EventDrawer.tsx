'use client'
import React, { useRef, useState } from 'react'
import { Drawer, Stack, TextField, Button } from '@mui/material'
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Formik } from 'formik'
import * as yup from 'yup'
import NoSsr from '@mui/material/NoSsr'
import { useAppDispatch } from '@/store/hooks'
import { addEvent } from '@/store/slices/eventsSlice'
import { closeAddDrawer } from '@/store/slices/modalSlice'
import { EventItem } from '@/store/slices/eventsSlice'

type Props = {
  open: boolean
  onClose: () => void
  initialEvent: EventItem | null
}

const schema = yup.object({
  title: yup.string().min(3).max(100).required(),
  start: yup.date().required(),
  end: yup.date().min(yup.ref('start')).required(),
})

const dialogSx = (t: number, l: number) => ({
  '& .MuiDialog-container': { position: 'relative' },
  '& .MuiPaper-root': {
    position: 'fixed',
    top: t,
    left: l,
    m: '-13px',
    p: 1,
  },
  '& .MuiPickersToolbar-root': { p: 0 },
  '& .MuiPickersToolbar-title, & .MuiTypography-overline': {
    fontSize: 11,
    p: 0,
  },
  '& .MuiPickersToolbarText-root': { fontSize: 20 },
})

export const EventDrawer: React.FC<Props> = ({ open, onClose, initialEvent }) => {
  const dispatch = useAppDispatch()
  const startRef = useRef<HTMLInputElement | null>(null)
  const endRef = useRef<HTMLInputElement | null>(null)
  const [startPos, setStartPos] = useState({ top: 0, left: 0 })
  const [endPos, setEndPos] = useState({ top: 0, left: 0 })

  const setPos = (
    ref: React.RefObject<HTMLInputElement | null>,
    setter: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>
  ) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setter({ top: r.bottom + 42, left: r.left })
  }

  const initialValues: EventItem =
    initialEvent ?? {
      id: '',
      title: '',
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      startTime: undefined,
      endTime: undefined,
    }

  const handleClose = () => {
    dispatch(closeAddDrawer())
    onClose()
  }

  return (
    <NoSsr defer>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Formik<EventItem>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={v => {
              dispatch(
                addEvent({
                  title: v.title,
                  start: v.start,
                  end: v.end,
                  startTime: v.startTime,
                  endTime: v.endTime,
                })
              )
              handleClose()
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue, handleSubmit }) => (
              <Stack spacing={2} sx={{ width: 320, p: 3 }}>
                <TextField
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <DatePicker
                  label="Start date"
                  value={new Date(values.start)}
                  onChange={d => setFieldValue('start', d?.toISOString())}
                />
                <DatePicker
                  label="End date"
                  value={new Date(values.end)}
                  onChange={d => setFieldValue('end', d?.toISOString())}
                />
                <MobileTimePicker
                  label="Start time"
                  value={values.startTime ? new Date(values.startTime) : null}
                  ampm={false}
                  format="HH:mm"
                  inputRef={startRef}
                  onOpen={() => setPos(startRef, setStartPos)}
                  onChange={d => setFieldValue('startTime', d?.toISOString())}
                  slotProps={{
                    dialog: {
                      disablePortal: true,
                      hideBackdrop: true,
                      sx: dialogSx(startPos.top, startPos.left),
                    },
                  }}
                />
                <MobileTimePicker
                  label="End time"
                  value={values.endTime ? new Date(values.endTime) : null}
                  ampm={false}
                  format="HH:mm"
                  inputRef={endRef}
                  onOpen={() => setPos(endRef, setEndPos)}
                  onChange={d => setFieldValue('endTime', d?.toISOString())}
                  slotProps={{
                    dialog: {
                      disablePortal: true,
                      hideBackdrop: true,
                      sx: dialogSx(endPos.top, endPos.left),
                    },
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <Button fullWidth variant="contained" onClick={() => handleSubmit()}>
                    Save
                  </Button>
                  <Button fullWidth variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            )}
          </Formik>
        </LocalizationProvider>
      </Drawer>
    </NoSsr>
  )
}