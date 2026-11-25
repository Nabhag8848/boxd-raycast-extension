import type { ReactElement } from "react";
import {
  MACHINE_SIZE_OPTIONS,
  ORG_DEFAULT_SPEC_OPTION,
} from "@/modules/machine/lib/create/sizes";
import type { SpecSizeFormFieldProps } from "@/modules/machine/types";
import { FormDropdownField } from "@/modules/shared";

const ORG_DEFAULT_KEYWORDS = ["default", "org", "size"];

export function SpecSizeFormField(props: SpecSizeFormFieldProps): ReactElement {
  return (
    <FormDropdownField
      {...props}
      title="Size"
      info="vCPU and memory for this machine."
    >
      <FormDropdownField.Section title="Default">
        <FormDropdownField.Item
          value={ORG_DEFAULT_SPEC_OPTION.value}
          title={ORG_DEFAULT_SPEC_OPTION.title}
          keywords={ORG_DEFAULT_KEYWORDS}
        />
      </FormDropdownField.Section>
      <FormDropdownField.Section title="Choose a size">
        {MACHINE_SIZE_OPTIONS.map((option) => (
          <FormDropdownField.Item
            key={option.value}
            value={option.value}
            title={option.title}
            keywords={["vcpu", "ram", "memory"]}
          />
        ))}
      </FormDropdownField.Section>
    </FormDropdownField>
  );
}
