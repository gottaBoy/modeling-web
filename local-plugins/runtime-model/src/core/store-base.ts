/**
 * Reconstructed from the observed runtime-model 0.2.2 StoreBase/QXStore.
 * The original bundle attributes the business class to chitanda (2021-06-30).
 * Third-party store behavior is supplied by @stencil/store, not copied here.
 */
import { createStore } from '@stencil/store';
import type { ObservableMap, Subscription } from '@stencil/store';

export class StoreBase<State extends Record<string, any>> {
  readonly evtCache = new Map<Function, () => void>();
  readonly store: ObservableMap<State>;
  readonly data: State;

  constructor(state: State = Object.create({})) {
    this.store = createStore(state);
    this.data = this.store.state;
  }

  reset(): void {
    this.store.reset();
  }

  dispose(): void {
    this.store.dispose();
    this.eventReset();
  }

  forceUpdate(key: keyof State): any {
    return this.store.forceUpdate(key);
  }

  use(...plugins: Subscription<State>[]): void {
    this.store.use(...plugins);
  }

  on<Key extends keyof State>(
    name: Key,
    cb: (value: State[Key]) => void,
  ): void {
    const fn = this.store.onChange(name, cb);
    this.evtCache.set(cb, fn);
  }

  off(cb: Function): void {
    if (this.evtCache.has(cb)) {
      const fn = this.evtCache.get(cb)!;
      fn();
      this.evtCache.delete(cb);
    }
  }

  eventReset(): void {
    this.evtCache.forEach(fn => {
      fn();
    });
    this.evtCache.clear();
  }
}

export class QXStore<
  State extends Record<string, any>,
> extends StoreBase<State> {}
