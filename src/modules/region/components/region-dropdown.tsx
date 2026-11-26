import { List } from "@raycast/api";
import type { ReactElement } from "react";
import { useMemo } from "react";
import {
  ALL_REGIONS_DROPDOWN_ITEM_TITLE,
  REGION_DROPDOWN_TOOLTIP,
} from "@/modules/region/lib/constants";
import { sortRegionsByName } from "@/modules/region/lib/params";
import { ALL_REGIONS, type RegionDropdownProps } from "@/modules/region/types";

/** Region picker for `List` `searchBarAccessory`. */
export function RegionDropdown({
  value,
  onChange,
  regions,
  isLoading = false,
  tooltip = REGION_DROPDOWN_TOOLTIP,
}: RegionDropdownProps): ReactElement<List.Dropdown.Props> {
  const sortedRegions = useMemo(
    () => (regions ? sortRegionsByName(regions) : undefined),
    [regions],
  );

  return (
    <List.Dropdown
      tooltip={tooltip}
      value={value}
      onChange={onChange}
      isLoading={isLoading}
    >
      <List.Dropdown.Item
        title={ALL_REGIONS_DROPDOWN_ITEM_TITLE}
        value={ALL_REGIONS}
      />
      {sortedRegions?.map((region) => (
        <List.Dropdown.Item
          key={region.id}
          title={region.name}
          value={region.id}
        />
      ))}
    </List.Dropdown>
  );
}
