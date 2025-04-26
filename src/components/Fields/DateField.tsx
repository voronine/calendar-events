// DatePickerField.tsx
import React from 'react'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { SxProps } from '@mui/system'

type PickerPosition = { top: number; left: number }

// internal dialog styling
const dialogSx = (top: number, left: number): SxProps => ({
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

type DatePickerFieldProps = {
  label: string
  value: Date
  onChange: (d: Date | null) => void
  error: boolean
  helperText: string
  inputRef: React.Ref<HTMLInputElement | null>
  onOpen: () => void
  position: PickerPosition
  helperTextProps?: Record<string, any>
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  error,
  helperText,
  inputRef,
  onOpen,
  position,
  helperTextProps = {}
}) => (
  <Box sx={{ flex: 1, minWidth: 0, minHeight: 95 }}>
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputRef={inputRef}
      onOpen={onOpen}
      slotProps={{
        textField: {
          fullWidth: true,
          error,
          helperText,
          ...helperTextProps
        },
        dialog: {
          disablePortal: true,
          hideBackdrop: true,
          sx: dialogSx(position.top, position.left)
        }
      }}
    />
  </Box>
)
