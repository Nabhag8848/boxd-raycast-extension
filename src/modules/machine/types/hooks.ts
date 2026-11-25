import type { Machine, Region } from "@boxd-sh/sdk";
import type { RegionPlacementContext } from "@/modules/machine/lib/regions";
import type { RegionFilterResult } from "@/modules/region/types";

export type MachineListResult = RegionFilterResult &
  Readonly<{
    machines: Machine[] | undefined;
    machineListError: Error | undefined;
    isMachineListLoading: boolean;
    reloadMachineList: () => void;
  }>;

export type RegionPlacementResult = Readonly<{
  sortedRegions: readonly Region[];
  placementContext: RegionPlacementContext;
  isRegionPlacementLoading: boolean;
  regionPlacementError: Error | undefined;
  reloadRegionPlacement: () => void;
}>;
