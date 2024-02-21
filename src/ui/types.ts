import tailwindColors from "tailwindcss/colors";

type TailwindColors = typeof tailwindColors;

type TailwindColorThemeFrom<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}-${TailwindColorThemeFrom<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type RemoveDefaultColor<T> = T extends `${string}-DEFAULT` ? never : T;

type UnionKeys<T> = T extends T ? keyof T : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>>
  : never;

// ### UI types ###

// To use union props without discriminator
export type StrictUnionProps<T> = StrictUnionHelper<T, T>;

export type Color = RemoveDefaultColor<TailwindColorThemeFrom<TailwindColors>>;

export type TextColor = `text-${Color}`;
