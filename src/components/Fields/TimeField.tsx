import React from 'react'
import { Box, TextFieldProps } from '@mui/material'
import { MobileTimePicker } from '@mui/x-date-pickers'
import { SxProps } from '@mui/system'

type PickerPosition = { top: number; left: number }

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

type TimePickerFieldProps = {
  label: string
  value: Date | null
  onChange: (d: Date | null) => void
  error: boolean
  helperText: string
  inputRef: React.Ref<HTMLInputElement | null>
  onOpen: () => void
  position: PickerPosition
  helperTextProps?: Partial<TextFieldProps>
}

export const TimePickerField: React.FC<TimePickerFieldProps> = ({
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
    <MobileTimePicker
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      format="HH:mm"
      inputRef={inputRef}
      onOpen={onOpen}
      slotProps={{
        textField: {
          fullWidth: true,
          error,
          helperText,
          ...helperTextProps,
        } as TextFieldProps,
        dialog: {
          disablePortal: true,
          hideBackdrop: true,
          PaperProps: { sx: { minWidth: 300 } },
          sx: dialogSx(position.top, position.left),
        },
      }}
    />
  </Box>
)
