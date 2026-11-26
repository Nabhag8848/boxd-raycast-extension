import type { ReactElement } from "react";
import {
  MACHINE_NAME_FIELD_INFO,
  MACHINE_NAME_FIELD_PLACEHOLDER,
  MACHINE_NAME_FIELD_TITLE,
} from "@/modules/machine/lib/create/constants";
import { FormTextField } from "@/modules/shared";
import type { MachineNameFormFieldProps } from "@/modules/machine/types";

export function MachineNameFormField(
  props: MachineNameFormFieldProps,
): ReactElement {
  return (
    <FormTextField
      {...props}
      title={MACHINE_NAME_FIELD_TITLE}
      placeholder={MACHINE_NAME_FIELD_PLACEHOLDER}
      info={MACHINE_NAME_FIELD_INFO}
    />
  );
}
