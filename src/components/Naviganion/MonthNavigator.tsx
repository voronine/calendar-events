'use client'
import React from 'react'
import { Stack, Typography, IconButton } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

interface Props {
  date: Date
  onChange: (d: Date) => void
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MonthNavigator: React.FC<Props> = ({ date, onChange }) => {
  const prev = () => onChange(new Date(date.getFullYear(), date.getMonth() - 1))
  const next = () => onChange(new Date(date.getFullYear(), date.getMonth() + 1))

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton onClick={prev}>
        <ChevronLeft />
      </IconButton>
      <Typography variant="h5">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
      </Typography>
      <IconButton onClick={next}>
        <ChevronRight />
      </IconButton>
    </Stack>
  )
}

export default MonthNavigator