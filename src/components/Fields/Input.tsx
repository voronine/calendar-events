import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

type InputFieldProps = {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: string
  helperTextProps?: Partial<TextFieldProps>
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error = false,
  helperText = '',
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
    {...helperTextProps}
  />
)
