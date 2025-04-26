import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

type TextAreaFieldProps = {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  rows?: number
  helperTextProps?: Partial<TextFieldProps>
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  rows = 4,
  helperTextProps = {}
}) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    fullWidth
    multiline
    rows={rows}
    {...helperTextProps}
  />
)
