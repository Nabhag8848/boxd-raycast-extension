/** Omit `region` on create; the platform applies org default, then closest. */
export const ORG_DEFAULT_REGION = "org-default" as const;

/** Same as org default for the API — omit `region` and let the server resolve closest when needed. */
export const CLOSEST_REGION = "closest" as const;

export type OrgDefaultRegion = typeof ORG_DEFAULT_REGION;
export type ClosestRegion = typeof CLOSEST_REGION;

export type RegionFormValue = OrgDefaultRegion | ClosestRegion | (string & {});

export const ORG_DEFAULT_REGION_OPTION = {
  value: ORG_DEFAULT_REGION,
  title: "Org default region",
} as const;

export const CLOSEST_REGION_OPTION = {
  value: CLOSEST_REGION,
  title: "Closest region",
} as const;

export const DEFAULT_REGION_FORM_VALUE: RegionFormValue = ORG_DEFAULT_REGION;

export function isOrgDefaultRegion(
  value: RegionFormValue,
): value is OrgDefaultRegion {
  return value === ORG_DEFAULT_REGION;
}

export function isClosestRegion(
  value: RegionFormValue,
): value is ClosestRegion {
  return value === CLOSEST_REGION;
}

/** Concrete region id for `machines.create`, or `undefined` to let boxd choose. */
export function toMachineCreateRegion(
  value: RegionFormValue,
): string | undefined {
  if (isOrgDefaultRegion(value) || isClosestRegion(value)) {
    return undefined;
  }

  const id = value.trim();
  return id.length > 0 ? id : undefined;
}
