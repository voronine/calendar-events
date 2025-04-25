'use client'
import React, { useRef, useState } from 'react'
import { Drawer, Stack, Box, TextField, Button } from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from '@mui/x-date-pickers'
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
  title: yup
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  start: yup.date().required('Start date is required'),
  end: yup
    .date()
    .min(yup.ref('start'), 'End date cannot be before start date')
    .required('End date is required'),
  startTime: yup.date().nullable(),
  endTime: yup
    .date()
    .nullable()
    .test(
      'endTime-after-startTime',
      'End time cannot be before start time',
      function (value) {
        const { startTime } = this.parent
        if (!startTime || !value) return true
        return new Date(value) >= new Date(startTime)
      }
    ),
})

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

export const EventDrawer: React.FC<Props> = ({
  open,
  onClose,
  initialEvent,
}) => {
  const dispatch = useAppDispatch()
  const startRef = useRef<HTMLInputElement | null>(null)
  const endRef = useRef<HTMLInputElement | null>(null)
  const [startPos, setStartPos] = useState({ top: 0, left: 0 })
  const [endPos, setEndPos] = useState({ top: 0, left: 0 })

  const updatePosition = (
    ref: React.RefObject<HTMLInputElement | null>,
    setter: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>
  ) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) setter({ top: rect.bottom + 42, left: rect.left })
  }

  const initialValues: EventItem = initialEvent ?? {
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
            onSubmit={(values) => {
              dispatch(
                addEvent({
                  title: values.title,
                  start: values.start,
                  end: values.end,
                  startTime: values.startTime,
                  endTime: values.endTime,
                })
              )
              handleClose()
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <Stack
                sx={{
                  width: 320,
                  height: '100%',
                  padding: 3,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Box sx={{ minHeight: 80 }}>
                    <TextField
                      name="title"
                      label="Title"
                      value={values.title}
                      onChange={handleChange}
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title ? errors.title : ''}
                      fullWidth
                    />
                  </Box>

                  <Box sx={{ minHeight: 80 }}>
                    <DatePicker
                      label="Start date"
                      value={new Date(values.start)}
                      onChange={(date) =>
                        setFieldValue('start', date?.toISOString())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: touched.start && Boolean(errors.start),
                          helperText: touched.start
                            ? (errors.start as string)
                            : '',
                        },
                        dialog: {
                          disablePortal: true,
                          hideBackdrop: true,
                          sx: dialogSx(startPos.top, startPos.left),
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ minHeight: 80 }}>
                    <DatePicker
                      label="End date"
                      value={new Date(values.end)}
                      onChange={(date) =>
                        setFieldValue('end', date?.toISOString())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: touched.end && Boolean(errors.end),
                          helperText: touched.end
                            ? (errors.end as string)
                            : '',
                        },
                        dialog: {
                          disablePortal: true,
                          hideBackdrop: true,
                          sx: dialogSx(endPos.top, endPos.left),
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ minHeight: 80 }}>
                    <MobileTimePicker
                      label="Start time"
                      value={
                        values.startTime ? new Date(values.startTime) : null
                      }
                      ampm={false}
                      format="HH:mm"
                      inputRef={startRef}
                      onOpen={() => updatePosition(startRef, setStartPos)}
                      onChange={(date) =>
                        setFieldValue('startTime', date?.toISOString())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error:
                            touched.startTime && Boolean(errors.startTime),
                          helperText: touched.startTime
                            ? (errors.startTime as string)
                            : '',
                        },
                        dialog: {
                          disablePortal: true,
                          hideBackdrop: true,
                          sx: {
                             ...dialogSx(startPos.top, startPos.left),
                             '& .MuiClock-root': { m: 0 },
                             '& .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar': {
                                p: 0,
                             },
                             '& .MuiPickersToolbar-title': {
                              position: 'absolute',
                              top: 8,
                              right: 16,
                            },
                            '& .MuiPickersArrowSwitcher-root': {
                              position: 'absolute',
                              top: 0,
                              right: 5,
                            },
                           },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ minHeight: 80 }}>
                    <MobileTimePicker
                      label="End time"
                      value={values.endTime ? new Date(values.endTime) : null}
                      ampm={false}
                      format="HH:mm"
                      inputRef={endRef}
                      onOpen={() => updatePosition(endRef, setEndPos)}
                      onChange={(date) =>
                        setFieldValue('endTime', date?.toISOString())
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error:
                            touched.endTime && Boolean(errors.endTime),
                          helperText: touched.endTime
                            ? (errors.endTime as string)
                            : '',
                        },
                        dialog: {
                          disablePortal: true,
                          hideBackdrop: true,
                          sx: {
                            ...dialogSx(endPos.top, endPos.left),
                             '& .MuiClock-root': { m: 0 },
                            '& .MuiDialogActions-root.MuiDialogActions-spacing.MuiPickersLayout-actionBar': {
                                p: 0,
                             },
                            '& .MuiPickersToolbar-title': {
                              position: 'absolute',
                              top: 8,
                              right: 16,
                            },
                            '& .MuiPickersArrowSwitcher-root': {
                              position: 'absolute',
                              top: 0,
                              right: 5,
                            },
                            }
                        },
                      }}
                    />
                  </Box>
                </Stack>

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
