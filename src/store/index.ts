import type { LoginResult } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import createSelectors from "./selectors";
import { immer } from "zustand/middleware/immer";


interface UserState {
    user: LoginResult;
}

interface Actions {
    setUser: (user: LoginResult) => void;
}

const useUserStore = create<UserState & Actions, [["zustand/persist", UserState], ["zustand/immer", never]]>(
    persist(
        immer((set) => ({
            user: {},
            setUser: (user: LoginResult) => {
                set((state) => state.user = user)
            },
        })),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage),
        })
);

const selectors = createSelectors(useUserStore);
export const { use: { user, setUser } } = selectors;