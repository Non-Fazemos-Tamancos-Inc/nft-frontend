import { create } from 'zustand'

export interface LoaderStore {
  loaders: Set<string>

  addLoader: (loader: string) => void
  removeLoader: (loader: string) => void
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  loaders: new Set(),
  addLoader: (loader) => set((state) => ({ loaders: new Set([...state.loaders, loader]) })),
  removeLoader: (loader) =>
    set((state) => ({ loaders: new Set([...state.loaders].filter((l) => l !== loader)) })),
}))
