import { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import { proxy, useSnapshot } from "valtio";
// A class that wraps valtio and has functions for setting and getting state
// This is used in the admin app

// import { useEffect } from 'react'
// import { default as clone, default as cloneDeep } from 'lodash/cloneDeep'
// import { proxy, useSnapshot } from 'valtio'
import proxyWithPersist, { PersistStrategy } from "valtio-persist";

import type {
  FlattenObjectKeys,
  GetFieldType,
  PersistedValtioOptions,
  UnpersistedValtioOptions,
} from "@acme/shared/common/types";
import { getValue, setValue } from "@acme/shared/common/functions";

// A class that wraps valtio and has functions for setting and getting state
// This is used in the admin app

export class ValtioWrapper<T extends Record<string, unknown>> {
  private initialValues: T;
  private values: T & { _persist?: { loaded: boolean } };
  private persist: boolean;

  constructor(
    store: T,
    options?: PersistedValtioOptions | UnpersistedValtioOptions,
  ) {
    this.persist = !!options?.persist;
    this.initialValues = cloneDeep(store);
    // Can only persist on client
    if (typeof window !== "undefined" && options?.persist) {
      this.values = proxyWithPersist({
        // must be unique, files/paths will be created with this prefix
        name: options?.name ?? "appState",
        initialState: store,
        persistStrategies:
          options.persist === true
            ? PersistStrategy.SingleFile
            : options.persist,
        version: options?.version ?? 1,
        migrations: options?.migrations ?? {},

        // see "Storage Engine" section below
        getStorage: () => options.storage,
      });
    } else {
      this.values = proxy(store);
    }
  }

  set = <U extends FlattenObjectKeys<T>, V extends GetFieldType<T, U>>(
    key: U,
    newValue: V,
  ) => {
    setValue(
      this.values,
      key,
      typeof newValue === "object" ? cloneDeep(newValue) : newValue,
    );
  };

  update = (state: Partial<T>) => merge(this.values, state);

  get = <U extends FlattenObjectKeys<T>>(key: U) => getValue(this.values, key);

  useSnapshot = () =>
    // If persist is true, only use the snapshot after it has loaded
    !this.persist || this.values._persist?.loaded
      ? useSnapshot(this.values)
      : this.initialValues;

  useWatch = <U extends FlattenObjectKeys<T>, V extends GetFieldType<T, U>>(
    key: U,
    value: V,
  ) => useEffect(() => this.set(key, value), [key, value]);

  clear = () => {
    const clonedInitialValues = cloneDeep(this.initialValues);
    Object.keys(clonedInitialValues).forEach((k) => {
      const key = k as FlattenObjectKeys<T>;
      this.set(key, getValue(clonedInitialValues, key));
    });
  };
}
