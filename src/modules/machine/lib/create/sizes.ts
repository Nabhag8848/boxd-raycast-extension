import type { MachineSize } from "@boxd-sh/sdk";

/** Form value: omit `spec.size` and use the org default. */
export const ORG_DEFAULT_MACHINE_SIZE = "org-default" as const;

export type OrgDefaultMachineSize = typeof ORG_DEFAULT_MACHINE_SIZE;

/** Spec dropdown value: org default or a concrete size token. */
export type SpecFormValue = OrgDefaultMachineSize | MachineSize;

export type MachineSizeOption = Readonly<{
  value: MachineSize;
  title: string;
}>;

export type OrgDefaultSpecOption = Readonly<{
  value: OrgDefaultMachineSize;
  title: string;
}>;

export const ORG_DEFAULT_SPEC_OPTION: OrgDefaultSpecOption = {
  value: ORG_DEFAULT_MACHINE_SIZE,
  title: "Org default size",
};

export const DEFAULT_SPEC_FORM_VALUE: SpecFormValue = ORG_DEFAULT_MACHINE_SIZE;

export function isOrgDefaultMachineSize(
  value: SpecFormValue,
): value is OrgDefaultMachineSize {
  return value === ORG_DEFAULT_MACHINE_SIZE;
}

/** Standard cluster sizes: `<vcpu>x<memory GiB>`. */
export const MACHINE_SIZE_OPTIONS: readonly MachineSizeOption[] = [
  { value: "1x4", title: "1 vCPU · 4 GB RAM" },
  { value: "2x8", title: "2 vCPU · 8 GB RAM" },
  { value: "4x16", title: "4 vCPU · 16 GB RAM" },
  { value: "8x32", title: "8 vCPU · 32 GB RAM" },
] as const;
