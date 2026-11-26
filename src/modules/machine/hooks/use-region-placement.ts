import { usePromise } from "@raycast/utils";
import { useMemo } from "react";
import { boxdClient } from "@/lib/boxd";
import type { RegionPlacementResult } from "@/modules/machine/types/hooks";
import { sortRegionsByName, useRegionsCatalog } from "@/modules/region";

/** Regions list + org default region for create-machine placement. */
export function useRegionPlacement(): RegionPlacementResult {
  const { regions, regionsLoading, regionsError, reloadRegions } =
    useRegionsCatalog();

  const {
    data: orgDefaultRegion,
    isLoading: orgDefaultLoading,
    error: orgDefaultError,
    revalidate: reloadOrgDefault,
  } = usePromise(() => boxdClient.getOrgDefaultRegion(), []);

  const sortedRegions = useMemo(() => {
    if (!regions) {
      return [];
    }
    return sortRegionsByName(regions);
  }, [regions]);

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
    isRegionPlacementLoading: regionsLoading || orgDefaultLoading,
    regionPlacementError: regionsError ?? orgDefaultError,
    reloadRegionPlacement() {
      reloadRegions();
      reloadOrgDefault();
    },
  };
}
