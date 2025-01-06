import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface TimeState {
  timeSettled: boolean
  setTimeSettled: (timeSettled: boolean) => void
  start: string
  end: string
  setTime: (start: string, end: string) => void
}

export const useTimeStore = create<TimeState>()(
  persist(
    set => ({
      timeSettled: false,
      setTimeSettled: timeSettled => set({ timeSettled }),
      start: '',
      end: '',
      setTime: (start, end) => set({ start, end }),
    }),
    {
      name: 'time-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
