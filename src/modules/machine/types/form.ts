import type { Region } from "@boxd-sh/sdk";
import type {
  FormCheckboxFieldProps,
  FormDropdownFieldProps,
  FormTextFieldProps,
} from "@/modules/shared/ui/types";

/** `title`, `placeholder`, and `info` are set inside {@link MachineNameFormField}. */
export type MachineNameFormFieldProps = Omit<
  FormTextFieldProps,
  "title" | "placeholder" | "info"
>;

/** Region list and field chrome are set inside {@link MachineRegionFormField}. */
export type MachineRegionFormFieldProps = Omit<
  FormDropdownFieldProps,
  "title" | "placeholder" | "info" | "children"
> &
  Readonly<{
    regions: readonly Region[];
  }>;

/** `label` and `info` are set inside {@link IsolatedFormField}. */
export type IsolatedFormFieldProps = Omit<
  FormCheckboxFieldProps,
  "label" | "info"
>;

/** `title`, `info`, and `children` are set inside {@link SpecSizeFormField}. */
export type SpecSizeFormFieldProps = Omit<
  FormDropdownFieldProps,
  "title" | "info" | "children"
>;
