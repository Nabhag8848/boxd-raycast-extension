export function compareRegionsByName(
  left: { name: string },
  right: { name: string },
): number {
  return left.name.localeCompare(right.name);
}
