import type { ReactElement } from "react";
import { FormTextField } from "@/modules/shared";
import type { MachineNameFormFieldProps } from "@/modules/machine/types";

export function MachineNameFormField(
  props: MachineNameFormFieldProps,
): ReactElement {
  return (
    <FormTextField
      {...props}
      title="Name"
      placeholder="Type a machine name…"
      info="Optional. boxd generates a name if you leave it blank."
    />
  );
}
