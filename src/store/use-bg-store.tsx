import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultBg = 'bg.png'

interface BgState {
  defaultBgSettled: boolean
  bg: string
  setBg: (bg: string) => void
  resetBg: () => void
}

export const useBgStore = create<BgState>()(
  persist(
    set => ({
      defaultBgSettled: true,
      bg: defaultBg,
      setBg: bg => set({ bg, defaultBgSettled: false }),
      resetBg: () => set({ bg: defaultBg, defaultBgSettled: true }),
    }),
    {
      name: 'bg-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
