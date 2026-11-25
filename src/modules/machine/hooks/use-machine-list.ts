import { useRegionScopedPromise } from "@/modules/region/hooks/use-region-scoped-promise";
import { fetchSortedMachines } from "@/modules/machine/lib/list-machines-query";
import type { MachineListResult } from "@/modules/machine/types/hooks";

/** Region-filtered machines for the List Machines command. */
export function useMachineList(): MachineListResult {
  const {
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
  } = useRegionScopedPromise(fetchSortedMachines);

  return {
    region,
    setRegion,
    searchBarAccessory,
    regions,
    regionsLoading,
    regionsError,
    reloadRegions,
    machines: regionScopedData,
    machineListError: regionScopedError,
    isMachineListLoading: isRegionScopedLoading,
    reloadMachineList: reloadRegionScopedData,
  };
}
