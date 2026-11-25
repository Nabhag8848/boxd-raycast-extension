import type { Region } from "@boxd-sh/sdk";

/**
 * Form sentinel only. The SDK routes `machines.create` by an explicit `region`
 * on the call (else account home), and does not read the org default — unlike
 * the CLI. We resolve org default via {@link Orgs.getDefaultRegion}.
 */

/** Use the org default region from boxd; if unset, the org home region. */
export const ORG_DEFAULT_REGION = "org-default" as const;

export type OrgDefaultRegion = typeof ORG_DEFAULT_REGION;

export type RegionFormValue = OrgDefaultRegion | (string & {});

export const ORG_DEFAULT_REGION_OPTION = {
  value: ORG_DEFAULT_REGION,
  title: "Org default region",
} as const;

export const DEFAULT_REGION_FORM_VALUE: RegionFormValue = ORG_DEFAULT_REGION;

function isOrgDefaultRegion(value: RegionFormValue): value is OrgDefaultRegion {
  return value === ORG_DEFAULT_REGION;
}

export type RegionPlacementContext = Readonly<{
  /** {@link Orgs.getDefaultRegion}; `null` when the org has none. */
  orgDefaultRegion: string | null;
  regions: readonly Region[];
}>;

function firstEnabledRegionId(regions: readonly Region[]): string | undefined {
  return regions.find((region) => region.orgState === "enabled")?.id;
}

function orgHomeRegionId(regions: readonly Region[]): string | undefined {
  const home = regions.find((region) => region.home);
  if (!home) {
    return undefined;
  }
  if (home.orgState === "enabled") {
    return home.id;
  }
  return firstEnabledRegionId(regions);
}

function resolveOrgDefaultPlacement(ctx: RegionPlacementContext): string {
  if (ctx.orgDefaultRegion) {
    return ctx.orgDefaultRegion;
  }

  const home = orgHomeRegionId(ctx.regions);
  if (home) {
    return home;
  }

  throw new Error("No enabled region available. Pick a region.");
}

/** Always returns a concrete region id for SDK routing. */
export function toMachineCreateRegion(
  value: RegionFormValue,
  ctx: RegionPlacementContext,
): string {
  if (isOrgDefaultRegion(value)) {
    return resolveOrgDefaultPlacement(ctx);
  }

  const id = value.trim();
  if (id.length === 0) {
    throw new Error("Region is required");
  }
  return id;
}
