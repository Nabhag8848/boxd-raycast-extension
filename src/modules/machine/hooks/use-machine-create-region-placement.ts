import { usePromise } from "@raycast/utils";
import { useMemo } from "react";
import { boxdClient } from "@/lib/boxd";
import type { MachineCreateRegionPlacementResult } from "@/modules/machine/types/hooks";
import { sortRegionsByName, useRegionsCatalog } from "@/modules/region";

/** Regions and org default region needed to create a machine. */
export function useMachineCreateRegionPlacement(): MachineCreateRegionPlacementResult {
  const { regions, regionsLoading, regionsError, reloadRegions } =
    useRegionsCatalog();

  const {
    data: orgDefaultRegion,
    isLoading: orgDefaultRegionLoading,
    error: orgDefaultRegionError,
    revalidate: reloadOrgDefaultRegion,
  } = usePromise(() => boxdClient.getOrgDefaultRegion(), []);

  const sortedRegions = useMemo(
    () => (regions ? sortRegionsByName(regions) : []),
    [regions],
  );

  const placementContext = useMemo(
    () => ({
      orgDefaultRegion: orgDefaultRegion ?? null,
      regions: sortedRegions,
    }),
    [orgDefaultRegion, sortedRegions],
  );

  return {
    sortedRegions,
    placementContext,
    isMachineCreateRegionPlacementLoading:
      regionsLoading || orgDefaultRegionLoading,
    machineCreateRegionPlacementError: regionsError ?? orgDefaultRegionError,
    reloadMachineCreateRegionPlacement() {
      reloadRegions();
      reloadOrgDefaultRegion();
    },
  };
}
