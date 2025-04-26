# Calendar App — Technical Documentation

DEMO https://calendar-events-57u4.vercel.app/

## Overview  
This is a client-side month-planner built with React and Next.js. Users can view a calendar grid, open a detailed list of events for any day, and add or edit events via slide-in drawers. All data is persisted locally, so the planner keeps its state between page reloads.

## Tech Stack  
- **Next.js 13** (App Router)  
- **React** + **TypeScript**  
- **Redux Toolkit** for global state  
- **MUI v5** (styled API) for UI components  
- **date-fns** for date utilities  
- **Formik + Yup** for forms and validation  
- **localStorage** for persistence  

## Data Flow & Persistence  
1. On load, a custom `Providers` reads `localStorage` and dispatches `hydrateEvents`.  
2. Redux subscription writes the `events` slice back to `localStorage` on changes.  
3. Two slices:  
   - `eventsSlice` manages event items and hydration.  
   - `modalSlice` tracks drawer state and payloads (date or event).

## User Interactions  
- **View Events**:  
  - Left-click a cell → “View Events” drawer (sorted list, large style).  
  - Click an event → “Edit Event” drawer.  
- **Add Event**:  
  - Right-click a cell or tap the FAB → “Add Event” drawer.  
- **Edit Event**:  
  - Form pre-fills existing data; submission dispatches `addEvent` or `updateEvent`.

## Form Handling & Validation  
- **Formik** for form state and submission.  
- **Yup** schema enforces title length, valid date ranges, and optional times.

## Rendering & Performance  
- `useMemo` for filtering/sorting events.  
- `useCallback` for stable handlers in memoized components.  
- `React.memo` wraps heavy components (`DayCell`, `EventList`).

## Extensibility   
Architecture adheres to SOLID and DRY: focused components, centralized styles, and separated business logic.
