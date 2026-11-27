import type { MachineStatus } from "@boxd-sh/sdk";

export function canOpenTerminal(status: MachineStatus): boolean {
  return (
    status === "running" || status === "suspended" || status === "hibernated"
  );
}
