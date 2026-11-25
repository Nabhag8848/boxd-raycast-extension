import type { Region } from "@boxd-sh/sdk";
import type { BindableProps } from "@/modules/shared/types/bindable";
import type { SelectedRegion } from "@/modules/region/types/region";

export type RegionDropdownProps = BindableProps<SelectedRegion> &
  Readonly<{
    regions: Region[] | undefined;
    isLoading?: boolean;
    tooltip?: string;
  }>;
