'use client'
import React from 'react'
import { format } from 'date-fns'
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'
import Box, { BoxProps } from '@mui/material/Box'

export type Props = {
  title: string
  start: string
  onClick: () => void
  large?: boolean
}

const StyledButton = styled(
  Button,
  { shouldForwardProp: prop => prop !== 'past' && prop !== 'large' }
)<ButtonProps & { past: boolean; large?: boolean }>(({ theme, past, large }) => ({
  justifyContent: 'flex-start',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textTransform: 'none',
  marginBottom: large ? theme.spacing(1) : theme.spacing(0.3),
  paddingTop: large ? theme.spacing(1) : theme.spacing(0.25),
  paddingBottom: large ? theme.spacing(1) : theme.spacing(0.25),
  paddingLeft: large ? theme.spacing(1.5) : theme.spacing(0.5),
  paddingRight: large ? theme.spacing(1.5) : theme.spacing(0.5),
  lineHeight: large ? 1.2 : 1,
  fontSize: large ? '0.875rem' : '0.6rem',
  borderLeft: large ? '4px solid rgba(59,175,214,0.7)' : '3px solid rgba(59, 175, 214, 0.7)',
  borderTopLeftRadius: large ? theme.shape.borderRadius : 0,
  borderBottomLeftRadius: large ? theme.shape.borderRadius : 0,
  backgroundColor: past ? 'rgba(228,227,227,0.9)' : 'rgba(173,216,230,0.5)',
  color: '#000',
  '&:hover': {
    backgroundColor: past ? 'rgba(211,211,211,0.5)' : 'rgba(173,216,230,0.7)',
  },
}))

const Info = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(0.2),
  justifyContent: 'space-between',
  width: '100%',
  opacity: 0.75,
}))

const DateText = styled(Box)<BoxProps>(() => ({
  fontSize: 9,
}))

const TimeText = styled(Box)<BoxProps>(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: 9,
}))

const EventItem: React.FC<Props> = ({ title, start, onClick, large = false }) => {
  const dateObj = new Date(start)
  const timeStr = format(dateObj, 'HH:mm')
  const past = dateObj < new Date()

  return (
    <StyledButton fullWidth variant="contained" onClick={onClick} past={past} large={large}>
      <Info component="div">
        <DateText component="span">{format(dateObj, 'dd.MM')}</DateText>
        {timeStr !== '00:00' && <TimeText component="span">{timeStr}</TimeText>}
      </Info>
      <Box component="span">{title}</Box>
    </StyledButton>
  )
}

export default EventItem
