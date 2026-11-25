import type { Region } from "@boxd-sh/sdk";
import type { RegionPlacementContext } from "@/modules/machine/lib/regions";

export type RegionPlacementResult = Readonly<{
  sortedRegions: readonly Region[];
  placementContext: RegionPlacementContext;
  isLoading: boolean;
  error: Error | undefined;
  reload: () => void;
}>;
