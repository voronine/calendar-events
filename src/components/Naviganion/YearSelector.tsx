'use client'
import React, { useMemo } from 'react'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'

type YearSelectorProps = {
  currentDate: Date
  onChange: (date: Date) => void
}

export default function YearSelector({ currentDate, onChange }: YearSelectorProps) {
  const yearOptions = useMemo(() => {
    const year = currentDate.getFullYear()
    return Array.from({ length: 5 }, (_, i) => year - 2 + i)
  }, [currentDate])

  const handleYearChange = (e: SelectChangeEvent<number>) => {
    const newYear = Number(e.target.value)
    const next = new Date(currentDate)
    next.setFullYear(newYear)
    onChange(next)
  }

  return (
    <Select<number>
      value={currentDate.getFullYear()}
      onChange={handleYearChange}
      size="small"
    >
      {yearOptions.map(y => (
        <MenuItem key={y} value={y}>
          {y}
        </MenuItem>
      ))}
    </Select>
  )
}
