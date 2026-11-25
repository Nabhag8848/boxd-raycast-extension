import type { Region } from "@boxd-sh/sdk";
import type { List } from "@raycast/api";
import type { ReactElement } from "react";
import type { AsyncSlice } from "@/modules/shared/types/query";
import type { SelectedRegion } from "@/modules/region/types/region";

export type RegionSelection = Readonly<{
  region: SelectedRegion;
  setRegion: (value: string) => void;
}>;

/** Catalog fields aligned with {@link AsyncSlice} but named for the regions list. */
export type RegionCatalogFields = Readonly<{
  regions: AsyncSlice<Region[]>["data"];
  regionsError: AsyncSlice<Region[]>["error"];
  regionsLoading: AsyncSlice<Region[]>["isLoading"];
  reloadRegions: AsyncSlice<Region[]>["revalidate"];
}>;

export type RegionSelectionResult = RegionSelection;
export type RegionsCatalogResult = RegionCatalogFields;

export type RegionFilterResult = RegionSelection &
  RegionCatalogFields &
  Readonly<{
    searchBarAccessory: ReactElement<List.Dropdown.Props>;
  }>;

export type RegionQuery<T> = (region: SelectedRegion) => Promise<T>;

/** Data from a region-scoped query (refetches when {@link RegionSelection.region} changes). */
export type RegionScopedQueryFields<T> = Readonly<{
  regionScopedData: T | undefined;
  regionScopedError: Error | undefined;
  isRegionScopedLoading: boolean;
  reloadRegionScopedData: () => void;
}>;

export type RegionScopedPromiseResult<T> = RegionFilterResult &
  RegionScopedQueryFields<T>;
