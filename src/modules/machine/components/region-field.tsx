import type { Region } from "@boxd-sh/sdk";
import type { ReactElement } from "react";
import {
  CLOSEST_REGION_OPTION,
  ORG_DEFAULT_REGION_OPTION,
} from "@/modules/machine/lib/regions";
import { FormDropdownField } from "@/modules/shared";
import type { MachineRegionFormFieldProps } from "@/modules/machine/types";

export function MachineRegionFormField({
  regions,
  ...props
}: MachineRegionFormFieldProps): ReactElement {
  const enabled = regions.filter((region) => region.orgState === "enabled");

  return (
    <FormDropdownField
      {...props}
      title="Region"
      placeholder="Search region…"
      info="Where this machine runs."
    >
      <FormDropdownField.Item
        value={ORG_DEFAULT_REGION_OPTION.value}
        title={ORG_DEFAULT_REGION_OPTION.title}
      />
      <FormDropdownField.Item
        value={CLOSEST_REGION_OPTION.value}
        title={CLOSEST_REGION_OPTION.title}
      />
      {enabled.map((region: Region) => (
        <FormDropdownField.Item
          key={region.id}
          value={region.id}
          title={region.name}
        />
      ))}
    </FormDropdownField>
  );
}
