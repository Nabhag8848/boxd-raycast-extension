export function compareRegionsByName(
  left: { name: string },
  right: { name: string },
): number {
  return left.name.localeCompare(right.name);
}

/** Returns a new regions list ordered alphabetically by display name. */
export function sortRegionsByName<T extends { name: string }>(
  regions: readonly T[],
): T[] {
  return regions.toSorted(compareRegionsByName);
}
