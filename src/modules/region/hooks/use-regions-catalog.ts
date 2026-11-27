import { usePromise } from "@raycast/utils";
import { boxdClient } from "@/lib/boxd";
import type { RegionsCatalogResult } from "@/modules/region/types/hooks";

/** boxd `regions.list()` for dropdowns and forms. */
export function useRegionsCatalog(): RegionsCatalogResult {
  const {
    data: regions,
    isLoading: regionsLoading,
    error: regionsError,
    revalidate: reloadRegions,
  } = usePromise(() => boxdClient.listRegions(), []);

  return {
    regions,
    regionsLoading,
    regionsError,
    reloadRegions,
  };
}
