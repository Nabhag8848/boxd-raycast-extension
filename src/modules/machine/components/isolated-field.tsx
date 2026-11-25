import type { ReactElement } from "react";
import { FormCheckboxField } from "@/modules/shared";
import type { IsolatedFormFieldProps } from "@/modules/machine/types";

export function IsolatedFormField(props: IsolatedFormFieldProps): ReactElement {
  return (
    <FormCheckboxField
      {...props}
      label="Isolated"
      info="Only reachable on networks you assign."
    />
  );
}
