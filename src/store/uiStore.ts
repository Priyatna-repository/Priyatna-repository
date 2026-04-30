'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UIStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  isLabsOpen: boolean
  openLabs: () => void
  closeLabs: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      isLabsOpen: false,
      openLabs: () => set({ isLabsOpen: true }),
      closeLabs: () => set({ isLabsOpen: false }),
    }),
    {
      name: 'priyatna-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
