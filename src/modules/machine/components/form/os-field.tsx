import type { ReactElement } from "react";
import {
  MACHINE_OS_FIELD_INFO,
  MACHINE_OS_FIELD_TITLE,
} from "@/modules/machine/lib/create/constants";
import { MACHINE_OS_OPTIONS } from "@/modules/machine/lib/create/os";
import type { MachineOsFormFieldProps } from "@/modules/machine/types";
import { FormDropdownField } from "@/modules/shared";

export function MachineOsFormField(
  props: MachineOsFormFieldProps,
): ReactElement {
  return (
    <FormDropdownField
      {...props}
      title={MACHINE_OS_FIELD_TITLE}
      info={MACHINE_OS_FIELD_INFO}
    >
      {MACHINE_OS_OPTIONS.map((option) => (
        <FormDropdownField.Item
          key={option.value}
          value={option.value}
          title={option.title}
        />
      ))}
    </FormDropdownField>
  );
}
