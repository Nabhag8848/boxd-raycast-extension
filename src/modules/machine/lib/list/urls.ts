import type { Machine } from "@boxd-sh/sdk";
import { boxdConsoleBaseUrl } from "@/lib/boxd/config";

const MACHINES_PATH = "/machines";
const MACHINE_QUERY_PARAMETER = "m";
const REGION_QUERY_PARAMETER = "r";

export function boxdConsoleMachineUrl(machine: Machine): string {
  const url = new URL(MACHINES_PATH, boxdConsoleBaseUrl());
  url.searchParams.set(MACHINE_QUERY_PARAMETER, machine.name);

  if (machine.region) {
    url.searchParams.set(REGION_QUERY_PARAMETER, machine.region);
  }

  return url.toString();
}
