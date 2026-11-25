import { Form } from "@raycast/api";
import type { ReactElement, ReactNode } from "react";
import type {
  FormCheckboxFieldProps,
  FormDatePickerFieldProps,
  FormDescriptionFieldProps,
  FormDropdownFieldProps,
  FormFilePickerFieldProps,
  FormPasswordFieldProps,
  FormSeparatorFieldProps,
  FormTagPickerFieldProps,
  FormTextAreaFieldProps,
  FormTextFieldProps,
} from "@/modules/shared/ui/types";

export function FormTextField(props: FormTextFieldProps): ReactElement {
  return <Form.TextField {...props} />;
}

export function FormPasswordField(props: FormPasswordFieldProps): ReactElement {
  return <Form.PasswordField {...props} />;
}

export function FormTextAreaField(props: FormTextAreaFieldProps): ReactElement {
  return <Form.TextArea {...props} />;
}

export function FormCheckboxField(props: FormCheckboxFieldProps): ReactElement {
  return <Form.Checkbox {...props} />;
}

type FormDropdownFieldComponent = ((
  props: FormDropdownFieldProps & { children?: ReactNode },
) => ReactElement) & {
  Item: typeof Form.Dropdown.Item;
  Section: typeof Form.Dropdown.Section;
};

export const FormDropdownField: FormDropdownFieldComponent = Object.assign(
  function FormDropdownField({
    children,
    ...props
  }: FormDropdownFieldProps & { children?: ReactNode }): ReactElement {
    return <Form.Dropdown {...props}>{children}</Form.Dropdown>;
  },
  {
    Item: Form.Dropdown.Item,
    Section: Form.Dropdown.Section,
  },
);

type FormDatePickerFieldComponent = ((
  props: FormDatePickerFieldProps,
) => ReactElement) & {
  Type: typeof Form.DatePicker.Type;
};

export const FormDatePickerField: FormDatePickerFieldComponent = Object.assign(
  function FormDatePickerField(props: FormDatePickerFieldProps): ReactElement {
    return <Form.DatePicker {...props} />;
  },
  { Type: Form.DatePicker.Type },
);

type FormTagPickerFieldComponent = ((
  props: FormTagPickerFieldProps & { children?: ReactNode },
) => ReactElement) & {
  Item: typeof Form.TagPicker.Item;
};

export const FormTagPickerField: FormTagPickerFieldComponent = Object.assign(
  function FormTagPickerField({
    children,
    ...props
  }: FormTagPickerFieldProps & { children?: ReactNode }): ReactElement {
    return <Form.TagPicker {...props}>{children}</Form.TagPicker>;
  },
  { Item: Form.TagPicker.Item },
);

export function FormFilePickerField(
  props: FormFilePickerFieldProps,
): ReactElement {
  return <Form.FilePicker {...props} />;
}

export function FormDescriptionField(
  props: FormDescriptionFieldProps,
): ReactElement {
  return <Form.Description {...props} />;
}

export function FormSeparatorField(
  props: FormSeparatorFieldProps,
): ReactElement {
  return <Form.Separator {...props} />;
}
