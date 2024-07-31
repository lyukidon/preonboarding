import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface UserStore {
  accessToken: string;
  user: any;
  setToken(payload: string): void;
  setUser(payload: any): void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set): UserStore => ({
      accessToken: "",
      user: {},
      setToken: (payload: string) => set({accessToken: payload}),
      setUser: (payload: any) => set({user: {...payload}})
    }),
    {
      name: 'tokenStorage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
