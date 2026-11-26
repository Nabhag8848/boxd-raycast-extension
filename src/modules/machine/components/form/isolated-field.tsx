import type { ReactElement } from "react";
import {
  MACHINE_ISOLATED_FIELD_INFO,
  MACHINE_ISOLATED_FIELD_LABEL,
} from "@/modules/machine/lib/create/constants";
import { FormCheckboxField } from "@/modules/shared";
import type { IsolatedFormFieldProps } from "@/modules/machine/types";

export function IsolatedFormField(props: IsolatedFormFieldProps): ReactElement {
  return (
    <FormCheckboxField
      {...props}
      label={MACHINE_ISOLATED_FIELD_LABEL}
      info={MACHINE_ISOLATED_FIELD_INFO}
    />
  );
}
