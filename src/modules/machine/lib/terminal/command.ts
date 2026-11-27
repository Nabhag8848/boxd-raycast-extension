import type { Machine } from "@boxd-sh/sdk";
import { BOXD_COMMAND } from "@/modules/machine/lib/terminal/constants";

const MACHINE_COMMAND = "machine";
const CONNECT_COMMAND = "connect";
const REGION_FLAG = "--region";

export function boxdConnectArguments(machine: Machine): string[] {
  return [
    BOXD_COMMAND,
    MACHINE_COMMAND,
    CONNECT_COMMAND,
    ...(machine.region ? [REGION_FLAG, machine.region] : []),
    machine.id,
  ];
}

export function powerShellQuote(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}
