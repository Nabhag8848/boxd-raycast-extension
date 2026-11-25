import type { Machine } from "@boxd-sh/sdk";
import { boxdClient } from "@/lib/boxd";
import type { SelectedRegion } from "@/modules/region/types/region";

export const MACHINE_LIST_SEARCH_PLACEHOLDER = "Search machines…";

export const MACHINE_LIST_LOAD_ERROR_TITLE = "Could not load machines";

export const MACHINE_LIST_EMPTY_TITLE = "No machines";

export const MACHINE_LIST_EMPTY_DESCRIPTION =
  "Create one with `boxd machine new` or in the boxd console.";

export function compareMachinesByName(left: Machine, right: Machine): number {
  return left.name.localeCompare(right.name);
}

export function machineListItemKeywords(machine: Machine): string[] {
  return [machine.status, machine.region ?? "", machine.org?.name ?? ""];
}

export async function fetchSortedMachines(
  selectedRegion: SelectedRegion,
): Promise<Machine[]> {
  const list = await boxdClient.listMachines({ region: selectedRegion });
  return list.toSorted(compareMachinesByName);
}
