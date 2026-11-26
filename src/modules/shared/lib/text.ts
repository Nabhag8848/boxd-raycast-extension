/** Capitalizes the initial character without changing the rest of the label. */
export function capitalizeFirstCharacter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
