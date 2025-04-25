'use client'
import React from 'react'
import { format } from 'date-fns'
import { Button, Box } from '@mui/material'

type Props = {
  title: string
  start: string
  onClick: () => void
}

export default function EventItem({ title, start, onClick }: Props) {
  const dateObj = new Date(start)

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      sx={{
        justifyContent: 'flex-start',
        textTransform: 'none',
        mb: 0.5,
        py: 0.25,
        px: 0.5,
        fontSize: '0.65rem',
        backgroundColor: dateObj < new Date()
          ? 'rgba(228,227,227,0.9)'
          : 'rgba(173,216,230,0.5)',
        color: '#000',
        '&:hover': {
          backgroundColor: dateObj < new Date()
            ? 'rgba(211,211,211,0.5)'
            : 'rgba(173,216,230,0.7)'
        }
      }}
    >
      <Box component="span" sx={{ mr: 0.5 }}>
        {format(dateObj, 'dd.MM')}
      </Box>
      {title}
    </Button>
  )
}
