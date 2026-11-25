import { List } from "@raycast/api";
import type { ReactElement } from "react";
import { useMemo } from "react";
import { RegionDropdown } from "@/modules/region/components/region-dropdown";
import { useRegionSelection } from "@/modules/region/hooks/use-region-selection";
import { useRegionsCatalog } from "@/modules/region/hooks/use-regions-catalog";
import type { RegionFilterResult } from "@/modules/region/types/hooks";

/**
 * Region picker + catalog for searchable List commands.
 * Compose with {@link useRegionScopedPromise} when data must refetch on region change.
 */
export function useRegionFilter(): RegionFilterResult {
  const { region, setRegion } = useRegionSelection();
  const { regions, regionsLoading, regionsError, reloadRegions } =
    useRegionsCatalog();

  const searchBarAccessory = useMemo(
    (): ReactElement<List.Dropdown.Props> => (
      <RegionDropdown
        value={region}
        onChange={setRegion}
        regions={regions}
        isLoading={regionsLoading}
      />
    ),
    [region, setRegion, regions, regionsLoading],
  );

  return {
    region,
    setRegion,
    searchBarAccessory,
    regions,
    regionsLoading,
    regionsError,
    reloadRegions,
  };
}
