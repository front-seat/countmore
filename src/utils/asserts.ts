/** Useful for statically catching missed cases. */
export const assertNever = (value: never): never => {
  throw new Error(`assertNever: ${value}`);
};
