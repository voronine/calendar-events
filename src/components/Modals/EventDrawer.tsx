'use client'
import React, { useRef, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import NoSsr from '@mui/material/NoSsr'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Formik } from 'formik'
import { useAppDispatch } from '@/store/hooks'
import { addEvent, updateEvent as updateEventAction } from '@/store/slices/eventsSlice'
import { closeAddDrawer } from '@/store/slices/modalSlice'
import { EventItem } from '@/store/slices/eventsSlice'
import { eventSchema } from '@/lib/eventValidation'
import { InputField } from '../Fields/Input'
import { TextAreaField } from '../Fields/TextArea'
import { DatePickerField } from '../Fields/DateField'
import { TimePickerField } from '../Fields/TimeField'
import { updatePosition } from './utils/updatePosition'

type Props = {
  open: boolean
  onClose: () => void
  initialEvent: EventItem | null
}

const Root = styled(Stack)(({ theme }) => ({
  width: 320,
  height: '100%',
  padding: theme.spacing(3),
  flexDirection: 'column',
}))

const Header = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
}))

const Content = styled(Stack)(() => ({
  flexGrow: 1,
}))

const TitleWrapper = styled(Box)(() => ({
  minHeight: 75,
}))

export const EventDrawer: React.FC<Props> = ({ open, onClose, initialEvent }) => {
  const dispatch = useAppDispatch()
  const isEdit = Boolean(initialEvent?.id)
  const startRef = useRef<HTMLInputElement | null>(null)
  const endRef = useRef<HTMLInputElement | null>(null)
  const [startPos, setStartPos] = useState({ top: 0, left: 0 })
  const [endPos, setEndPos] = useState({ top: 0, left: 0 })

  const initialValues: EventItem = initialEvent ?? {
    id: '',
    title: '',
    description: '',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    startTime: undefined,
    endTime: undefined,
  }

  const helperTextProps = { FormHelperTextProps: { sx: { fontSize: '0.6rem' } } }

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
              <Root>
                <Header>
                  <Typography variant="h6">
                    {isEdit ? 'Edit event' : 'Add event'}
                  </Typography>
                  
                  <IconButton onClick={handleClose} size="small">
                    <CloseIcon />
                  </IconButton>
                </Header>

                <Content spacing={2}>
                  <TitleWrapper>
                    <InputField
                      name="title"
                      label="Title"
                      value={values.title}
                      onChange={handleChange}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title ? errors.title : ''}
                      helperTextProps={helperTextProps}
                    />
                  </TitleWrapper>

                  <Stack direction="row" spacing={2}>
                    <DatePickerField
                      label="Start date"
                      value={new Date(values.start)}
                      onChange={d => setFieldValue('start', d?.toISOString())}
                      error={Boolean(touched.start && errors.start)}
                      helperText={touched.start ? (errors.start as string) : ''}
                      inputRef={startRef}
                      onOpen={() => updatePosition(startRef, setStartPos)}
                      position={startPos}
                      helperTextProps={helperTextProps}
                    />

                    <DatePickerField
                      label="End date"
                      value={new Date(values.end)}
                      onChange={d => setFieldValue('end', d?.toISOString())}
                      error={Boolean(touched.end && errors.end)}
                      helperText={touched.end ? (errors.end as string) : ''}
                      inputRef={endRef}
                      onOpen={() => updatePosition(endRef, setEndPos)}
                      position={endPos}
                      helperTextProps={helperTextProps}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <TimePickerField
                      label="Start time"
                      value={values.startTime ? new Date(values.startTime) : null}
                      onChange={d => setFieldValue('startTime', d?.toISOString())}
                      error={Boolean(touched.startTime && errors.startTime)}
                      helperText={touched.startTime ? (errors.startTime as string) : ''}
                      inputRef={startRef}
                      onOpen={() => updatePosition(startRef, setStartPos)}
                      position={startPos}
                      helperTextProps={helperTextProps}
                    />

                    <TimePickerField
                      label="End time"
                      value={values.endTime ? new Date(values.endTime) : null}
                      onChange={d => setFieldValue('endTime', d?.toISOString())}
                      error={Boolean(touched.endTime && errors.endTime)}
                      helperText={touched.endTime ? (errors.endTime as string) : ''}
                      inputRef={endRef}
                      onOpen={() => updatePosition(endRef, setEndPos)}
                      position={endPos}
                      helperTextProps={helperTextProps}
                    />
                  </Stack>

                  <TextAreaField
                    name="description"
                    label="Description"
                    value={values.description ?? ''}
                    onChange={handleChange}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description ? errors.description : ''}
                    rows={4}
                    helperTextProps={helperTextProps}
                  />
                </Content>

                <Stack direction="row" spacing={2}>
                  <Button fullWidth variant="contained" onClick={() => handleSubmit()}>
                    {isEdit ? 'Update' : 'Save'}
                  </Button>
                  <Button fullWidth variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                </Stack>
              </Root>
            )}
          </Formik>
        </LocalizationProvider>
      </Drawer>
    </NoSsr>
  )
}