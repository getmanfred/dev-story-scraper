export type Fix<T> = {
  isRequired(t: T): boolean;
  execute(t: T): T;
};
