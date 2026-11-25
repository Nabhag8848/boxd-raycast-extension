/** Aggregate picker value passed to list-style APIs (`machines.list({ region: "all" })`). */
export const ALL_REGIONS = "all" as const;

export type AllRegionsToken = typeof ALL_REGIONS;

/** Concrete region id (`"fra"`, `"nyc"`, …) or {@link AllRegionsToken}. */
export type SelectedRegion = AllRegionsToken | (string & {});
