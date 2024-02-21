import type { ProxyPersistStorageEngine } from "valtio-persist";

export const storage: ProxyPersistStorageEngine = {
  getItem: (name) => window.localStorage.getItem(name),
  // Need ?? null because localStorage fails with undefined
  setItem: (name, value) => window.localStorage.setItem(name, value ?? null),
  removeItem: (name) => window.localStorage.removeItem(name),
  getAllKeys: () => Object.keys(window.localStorage),
};
