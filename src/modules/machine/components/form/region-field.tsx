import type { Region } from "@boxd-sh/sdk";
import type { ReactElement } from "react";
import {
  MACHINE_REGION_FIELD_INFO,
  MACHINE_REGION_FIELD_PLACEHOLDER,
  MACHINE_REGION_FIELD_TITLE,
} from "@/modules/machine/lib/create/constants";
import { ORG_DEFAULT_REGION_OPTION } from "@/modules/machine/lib/create/regions";
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
      title={MACHINE_REGION_FIELD_TITLE}
      placeholder={MACHINE_REGION_FIELD_PLACEHOLDER}
      info={MACHINE_REGION_FIELD_INFO}
    >
      <FormDropdownField.Item
        value={ORG_DEFAULT_REGION_OPTION.value}
        title={ORG_DEFAULT_REGION_OPTION.title}
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
