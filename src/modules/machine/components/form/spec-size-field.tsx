import type { ReactElement } from "react";
import {
  MACHINE_SIZE_DEFAULT_KEYWORDS,
  MACHINE_SIZE_DEFAULT_SECTION_TITLE,
  MACHINE_SIZE_FIELD_INFO,
  MACHINE_SIZE_FIELD_TITLE,
  MACHINE_SIZE_KEYWORDS,
  MACHINE_SIZE_OPTIONS_SECTION_TITLE,
} from "@/modules/machine/lib/create/constants";
import {
  MACHINE_SIZE_OPTIONS,
  ORG_DEFAULT_SPEC_OPTION,
} from "@/modules/machine/lib/create/sizes";
import type { SpecSizeFormFieldProps } from "@/modules/machine/types";
import { FormDropdownField } from "@/modules/shared";

export function SpecSizeFormField(props: SpecSizeFormFieldProps): ReactElement {
  return (
    <FormDropdownField
      {...props}
      title={MACHINE_SIZE_FIELD_TITLE}
      info={MACHINE_SIZE_FIELD_INFO}
    >
      <FormDropdownField.Section title={MACHINE_SIZE_DEFAULT_SECTION_TITLE}>
        <FormDropdownField.Item
          value={ORG_DEFAULT_SPEC_OPTION.value}
          title={ORG_DEFAULT_SPEC_OPTION.title}
          keywords={MACHINE_SIZE_DEFAULT_KEYWORDS}
        />
      </FormDropdownField.Section>
      <FormDropdownField.Section title={MACHINE_SIZE_OPTIONS_SECTION_TITLE}>
        {MACHINE_SIZE_OPTIONS.map((option) => (
          <FormDropdownField.Item
            key={option.value}
            value={option.value}
            title={option.title}
            keywords={MACHINE_SIZE_KEYWORDS}
          />
        ))}
      </FormDropdownField.Section>
    </FormDropdownField>
  );
}
