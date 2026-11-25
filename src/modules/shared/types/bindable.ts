/** Controlled value + string callback (Raycast dropdowns, pickers). */
export type BindableProps<TValue> = Readonly<{
  value: TValue;
  onChange: (value: string) => void;
}>;
