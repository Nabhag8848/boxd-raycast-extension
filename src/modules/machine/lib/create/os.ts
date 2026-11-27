import type { MachineOs } from "@boxd-sh/sdk";

export type MachineOsOption = Readonly<{
  value: MachineOs;
  title: string;
}>;

export const MACHINE_OS_OPTIONS: readonly MachineOsOption[] = [
  { value: "linux", title: "Linux" },
  { value: "windows", title: "Windows" },
];

export const DEFAULT_MACHINE_OS: MachineOs = "linux";

export function toMachineOs(value: string): MachineOs {
  return value === "windows" ? "windows" : "linux";
}
