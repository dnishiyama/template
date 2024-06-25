import pick from "lodash/pick";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getStorage } from "./storage";

export interface StoreValues {
  storeValue: string;
  persistedValue: string;
}

export const initialState: StoreValues = {
  storeValue: "test",
  persistedValue: "thisIsPersisted",
};

const APP_STATE_NAME = "template_store";

type Store = StoreValues;

const storage = createJSONStorage<Store>(getStorage);

const PERSISTED_KEYS: (keyof Store)[] = ["persistedValue"];

/**
 * We have to be thoughtful about the fact that state lives in the BLE device, the app, and the server
 * We will treat the app as app as the source of truth, and then push that information to the server and the device
 */
export const useAppStore = create<Store>()(
  persist(
    () => ({
      ...initialState,
    }),
    {
      name: APP_STATE_NAME,
      storage,
      version: 1,
      migrate: (state) => {
        console.log("migrating state", state);
        return initialState;
      },
      partialize: (state) => pick(state, PERSISTED_KEYS) as Store,
      // This will hold the app at the splash screen until the hydration is done.
      onRehydrateStorage: (state) => {
        console.log("store hydration starts", state);
        return (hydratedState, error) => {
          if (error) {
            console.log("an error happened during store hydration", error);
          } else {
            const hydratedStateString = JSON.stringify(hydratedState);
            console.log(
              "store hydration finished",
              hydratedStateString.length > 40
                ? hydratedStateString.slice(0, 40)
                : hydratedStateString,
            );
          }
        };
      },
    },
  ),
);
