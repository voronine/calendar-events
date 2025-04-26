'use client'
import React, { useRef, useState } from 'react'
import { Drawer, Stack, Box, TextField, Button, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Formik } from 'formik'
import NoSsr from '@mui/material/NoSsr'
import { useAppDispatch } from '@/store/hooks'
import { addEvent, updateEvent as updateEventAction } from '@/store/slices/eventsSlice'
import { closeAddDrawer } from '@/store/slices/modalSlice'
import { EventItem } from '@/store/slices/eventsSlice'
import { eventSchema } from '@/lib/eventValidation'

type Props = {
  open: boolean
  onClose: () => void
  initialEvent: EventItem | null
}

const dialogSx = (top: number, left: number) => ({
  '& .MuiDialog-container': { position: 'relative' },
  '& .MuiPaper-root': {
    position: 'fixed',
    top,
    left,
    margin: '-13px',
    padding: 1,
  },
  '& .MuiPickersToolbar-root': { padding: 0 },
  '& .MuiPickersToolbar-title, & .MuiTypography-overline': {
    fontSize: 11,
    padding: 0,
  },
  '& .MuiPickersToolbarText-root': { fontSize: 20 },
})

export const EventDrawer: React.FC<Props> = ({ open, onClose, initialEvent }) => {
  const dispatch = useAppDispatch()
  const isEdit = Boolean(initialEvent && initialEvent.id)
  const startRef = useRef<HTMLInputElement | null>(null)
  const endRef = useRef<HTMLInputElement | null>(null)
  const [startPos, setStartPos] = useState({ top: 0, left: 0 })
  const [endPos, setEndPos] = useState({ top: 0, left: 0 })

  const updatePosition = (
    ref: React.RefObject<HTMLInputElement | null>,
    setter: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>
  ) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const desiredLeft = rect.left
      const dialogWidth = 300
      const margin = 46
      const maxLeft = window.innerWidth - dialogWidth - margin
      const clampedLeft = Math.min(desiredLeft, maxLeft)
      setter({ top: rect.bottom + 42, left: clampedLeft })
    }
  }

  const initialValues: EventItem = initialEvent ?? {
    id: '',
    title: '',
    description: '',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    startTime: undefined,
    endTime: undefined,
  }

  const handleClose = () => {
    dispatch(closeAddDrawer())
    onClose()
  }

  const helperTextProps = { FormHelperTextProps: { sx: { fontSize: '0.6rem' } } }

  return (
    <NoSsr defer>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Formik<EventItem>
            initialValues={initialValues}
            validationSchema={eventSchema}
            onSubmit={values => {
              if (isEdit) {
                dispatch(updateEventAction(values))
              } else {
                dispatch(
                  addEvent({
                    title: values.title,
                    description: values.description,
                    start: values.start,
                    end: values.end,
                    startTime: values.startTime,
                    endTime: values.endTime,
                  })
                )
              }
              handleClose()
            }}
          >
            {({ values, errors, touched, handleChange, setFieldValue, handleSubmit }) => (
              <Stack sx={{ width: 320, height: '100%', p: 3, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "12px"}}>
                  <Typography variant="h6">{isEdit ? 'Edit event' : 'Add event'}</Typography>
                  <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                  </IconButton>
                </Stack>

                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Box sx={{ minHeight: 75 }}>
                    <TextField
                      name="title"
                      label="Title"
                      value={values.title}
                      onChange={handleChange}
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title ? errors.title : ''}
                      fullWidth
                      {...helperTextProps}
                    />
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1, minWidth: 0, minHeight: 95 }}>
                      <DatePicker
                        label="Start date"
                        value={new Date(values.start)}
                        onChange={date => setFieldValue('start', date?.toISOString())}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.start && Boolean(errors.start),
                            helperText: touched.start ? (errors.start as string) : '',
                            ...helperTextProps,
                          },
                          dialog: {
                            disablePortal: true,
                            hideBackdrop: true,
                            sx: dialogSx(startPos.top, startPos.left),
                          },
                        }}
                        inputRef={startRef}
                        onOpen={() => updatePosition(startRef, setStartPos)}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0, minHeight: 95 }}>
                      <DatePicker
                        label="End date"
                        value={new Date(values.end)}
                        onChange={date => setFieldValue('end', date?.toISOString())}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.end && Boolean(errors.end),
                            helperText: touched.end ? (errors.end as string) : '',
                            ...helperTextProps,
                          },
                          dialog: {
                            disablePortal: true,
                            hideBackdrop: true,
                            sx: dialogSx(endPos.top, endPos.left),
                          },
                        }}
                        inputRef={endRef}
                        onOpen={() => updatePosition(endRef, setEndPos)}
                      />
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1, minWidth: 0, minHeight: 95 }}>
                      <MobileTimePicker
                        label="Start time"
                        value={values.startTime ? new Date(values.startTime) : null}
                        ampm={false}
                        format="HH:mm"
                        inputRef={startRef}
                        onOpen={() => updatePosition(startRef, setStartPos)}
                        onChange={date => setFieldValue('startTime', date?.toISOString())}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.startTime && Boolean(errors.startTime),
                            helperText: touched.startTime ? (errors.startTime as string) : '',
                            ...helperTextProps,
                          },
                          dialog: {
                            disablePortal: true,
                            hideBackdrop: true,
                            PaperProps: { sx: { minWidth: 300 } },
                            sx: {
                              ...dialogSx(startPos.top, startPos.left),
                              '& .MuiClock-root': { m: 0 },
                              '& .MuiDialogActions-root': { p: 0 },
                              '& .MuiPickersToolbar-title': { position: 'absolute', top: 8, right: 16 },
                              '& .MuiPickersArrowSwitcher-root': { position: 'absolute', top: 0, right: 5, p: 0 },
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <MobileTimePicker
                        label="End time"
                        value={values.endTime ? new Date(values.endTime) : null}
                        ampm={false}
                        format="HH:mm"
                        inputRef={endRef}
                        onOpen={() => updatePosition(endRef, setEndPos)}
                        onChange={date => setFieldValue('endTime', date?.toISOString())}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: touched.endTime && Boolean(errors.endTime),
                            helperText: touched.endTime ? (errors.endTime as string) : '',
                            ...helperTextProps,
                          },
                          dialog: {
                            disablePortal: true,
                            hideBackdrop: true,
                            PaperProps: { sx: { minWidth: 300 } },
                            sx: {
                              ...dialogSx(endPos.top, endPos.left),
                              '& .MuiClock-root': { m: 0 },
                              '& .MuiDialogActions-root': { p: 0 },
                              '& .MuiPickersToolbar-title': { position: 'absolute', top: 8, right: 16 },
                              '& .MuiPickersArrowSwitcher-root': { position: 'absolute', top: 0, right: 5 },
                            },
                          },
                        }}
                      />
                    </Box>
                  </Stack>

                  <TextField
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description ? errors.description : ''}
                    fullWidth
                    multiline
                    rows={4}
                    {...helperTextProps}
                  />
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Button fullWidth variant="contained" onClick={() => handleSubmit()}>
                    {isEdit ? 'Update' : 'Save'}
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
