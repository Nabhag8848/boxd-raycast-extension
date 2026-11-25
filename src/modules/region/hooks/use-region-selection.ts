import { useCachedState } from "@raycast/utils";
import { REGION_STORAGE_KEY } from "@/modules/region/lib/constants";
import {
  ALL_REGIONS,
  type RegionSelectionResult,
  type SelectedRegion,
} from "@/modules/region/types";

/** Persisted region choice shared across every command (no UI). */
export function useRegionSelection(): RegionSelectionResult {
  const [region, setRegion] = useCachedState<SelectedRegion>(
    REGION_STORAGE_KEY,
    ALL_REGIONS,
  );

  return {
    region,
    setRegion,
  };
}
