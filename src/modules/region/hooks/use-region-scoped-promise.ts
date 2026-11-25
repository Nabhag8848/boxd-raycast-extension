import { usePromise } from "@raycast/utils";
import { useRegionFilter } from "@/modules/region/hooks/use-region-filter";
import type {
  RegionQuery,
  RegionScopedPromiseResult,
} from "@/modules/region/types/hooks";

/**
 * List commands: shared region UI + data that reloads when `region` changes.
 */
export function useRegionScopedPromise<T>(
  query: RegionQuery<T>,
): RegionScopedPromiseResult<T> {
  const filter = useRegionFilter();
  const {
    region,
    setRegion,
    searchBarAccessory,
    regions,
    regionsLoading,
    regionsError,
    reloadRegions,
  } = filter;

  const {
    data: regionScopedData,
    error: regionScopedError,
    isLoading: isRegionScopedLoading,
    revalidate: reloadRegionScopedData,
  } = usePromise(query, [region]);

  return {
    region,
    setRegion,
    searchBarAccessory,
    regions,
    regionsLoading,
    regionsError,
    reloadRegions,
    regionScopedData,
    regionScopedError,
    isRegionScopedLoading,
    reloadRegionScopedData,
  };
}
