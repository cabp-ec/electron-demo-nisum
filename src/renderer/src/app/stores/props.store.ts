import { createStore, PropsFactory, select, setProp, Store } from '@ngneat/elf';
import { PropsStoreInterface } from '../interfaces/props.store.interface';

export class PropsStore implements PropsStoreInterface {
  #store: Store;

  constructor(name: string, withProps: PropsFactory<unknown, unknown>) {
    this.#store = createStore({ name }, withProps);
  }

  /**
   * @inheritDoc
   */
  value(prop: string | null = null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = this.#store.getValue();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return prop ? state[prop] : state;
  }

  /**
   * @inheritDoc
   */
  state(): unknown {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.#store.pipe(select((state) => state));
  }

  /**
   * @inheritDoc
   */
  getProp(prop: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return this.#store.pipe(select((state) => state[prop]));
  }

  /**
   * @inheritDoc
   */
  setProp(prop: string, value: unknown) {
    this.#store.update(setProp(prop, value));
  }

  /**
   * @inheritDoc
   */
  set(props: object) {
    Object.keys(props).forEach((key: string) => {
      // @ts-ignore
      this.setProp(key, props[key]);
    });
  }
}
