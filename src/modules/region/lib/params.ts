import type { MachineListParams, RegionOption } from "@boxd-sh/sdk";
import {
  ALL_REGIONS,
  type SelectedRegion,
} from "@/modules/region/types/region";

export function isAllRegions(
  region: SelectedRegion,
): region is typeof ALL_REGIONS {
  return region === ALL_REGIONS;
}

export function regionListParam(
  region: SelectedRegion,
): Pick<MachineListParams, "region"> {
  return { region };
}

export function regionCallParam(region: SelectedRegion): RegionOption {
  return isAllRegions(region) ? {} : { region };
}

export function compareRegionsByName(
  left: { name: string },
  right: { name: string },
): number {
  return left.name.localeCompare(right.name);
}
