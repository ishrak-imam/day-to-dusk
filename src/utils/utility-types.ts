/*
 * It helps to get types as a single object listing all properties of the intersection
 */
export type Intersection<T> = {
  [K in keyof T]: T[K];
} & object;

/*
 * It helps to make properties of an object optional
 */
export type Optional<T, K extends keyof T> = Intersection<
  Pick<Partial<T>, K> & Omit<T, K>
>;

/*
 * It helps to get the inner type of another type
 * e.g Unpacked<Array<string>> => string
 */
export type Unpacked<T> = T extends (infer U)[]
  ? U
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
      ? U
      : T;
