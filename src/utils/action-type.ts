export interface ActionType<T> {
  (fn: (prev: T) => T): void;
}
