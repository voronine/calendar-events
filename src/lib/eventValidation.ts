import * as yup from 'yup'

export const eventSchema = yup.object({
  title: yup
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  description: yup
    .string()
    .max(300, 'Description must be at most 300 characters'),
  start: yup
    .date()
    .min(new Date(), 'Cannot set an event in the past')
    .required('Start date is required'),
  end: yup
    .date()
    .min(yup.ref('start'), 'End date cannot be before start date')
    .required('End date is required'),
  startTime: yup.date().nullable(),
  endTime: yup
    .date()
    .nullable()
    .test(
      'endTime-after-startTime',
      'End time cannot be before start time',
      function (value) {
        const { startTime } = this.parent
        if (!startTime || !value) return true
        return new Date(value) >= new Date(startTime)
      }
    ),
})