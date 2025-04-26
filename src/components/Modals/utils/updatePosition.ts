export const updatePosition = (
    ref: React.RefObject<HTMLInputElement | null>,
    setter: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>
  ) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const maxLeft = window.innerWidth - 300 - 46
      setter({ top: rect.bottom + 42, left: Math.min(rect.left, maxLeft) })
    }
  }
