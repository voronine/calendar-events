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
  const timeStr = format(dateObj, 'HH:mm')

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={onClick}
      sx={{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textTransform: 'none',
        mb: 0.3,
        py: 0.25,
        px: 0.5,
        lineHeight: 1,
        fontSize: '0.6rem',
        borderLeft: '3px solid rgba(59, 175, 214, 0.7)',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor:
          dateObj < new Date()
            ? 'rgba(228,227,227,0.9)'
            : 'rgba(173,216,230,0.5)',
        color: '#000',
        '&:hover': {
          backgroundColor:
            dateObj < new Date()
              ? 'rgba(211,211,211,0.5)'
              : 'rgba(173,216,230,0.7)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.2, justifyContent: 'space-between', width: '100%', opacity: 0.75 }}>
        <Box component="span" sx={{ fontSize: 9 }}>
          {format(dateObj, 'dd.MM')}
        </Box>
        {timeStr !== '00:00' && (
          <Box component="span" sx={{ ml: 1, fontSize: 9 }}>
            {timeStr}
          </Box>
        )}
      </Box>
      <Box component="span">{title}</Box>
    </Button>
  )
}
