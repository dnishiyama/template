"use client";

import { Button } from "@acme/ui/button";

import { useAppStore } from "~/utils/store";

export const StoreShowcase = () => {
  const persistedValue = useAppStore((s) => s.persistedValue);
  const storeValue = useAppStore((s) => s.storeValue);

  // A pretty display of the values and buttons to change them
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Store Showcase</h2>
      <div>
        <p>
          <b>Store Value</b>: {storeValue}
        </p>
        <p>
          <b>Persisted Value</b>: {persistedValue}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            const newValue = Math.ceil(Math.random() * 1000).toString();
            useAppStore.setState({
              storeValue: `newStoreValue ${newValue}`,
            });
          }}
        >
          Change Store Value
        </Button>
        <Button
          onClick={() => {
            const newValue = Math.ceil(Math.random() * 1000).toString();
            useAppStore.setState({
              persistedValue: `newPersistedValue ${newValue}`,
            });
          }}
        >
          Change Persisted Value
        </Button>
      </div>
    </div>
  );
};
