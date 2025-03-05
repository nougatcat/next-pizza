import { create } from 'zustand'

interface State {
    activeId: number
    setActiveId: (activeId: number) => void
}


export const useCategoryStore = create<State>((set) => ({ //create - функция создания хука из zustand
    activeId: 1,
    setActiveId: (activeId: number) => set({ activeId })
}))