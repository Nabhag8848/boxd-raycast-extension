import type { Machine } from "@boxd-sh/sdk";
import { boxdClient } from "@/lib/boxd";
import type { SelectedRegion } from "@/modules/region/types/region";

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
