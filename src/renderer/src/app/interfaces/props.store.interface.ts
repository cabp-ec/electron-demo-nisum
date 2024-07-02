export interface PropsStoreInterface {
  /**
   * Get the current value of a prop or the current state
   *
   * @param prop
   */
  value(prop: string | null = null): unknown;

  /**
   * Get the current state
   */
  state(): unknown;

  /**
   * Get an observer for a single property of the state
   *
   * @param prop
   */
  getProp(prop: string): void,

  /**
   * Set a value for a single property of the state
   *
   * @param prop
   * @param value
   */
  setProp(prop: string, value: unknown): void,

  /**
   * Set the whole state
   *
   * @param props
   */
  set(props: object): void
}
