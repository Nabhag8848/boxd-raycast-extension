import type { Machine, MachineStatus } from "@boxd-sh/sdk";
import { Color, List } from "@raycast/api";
import { capitalizeFirstCharacter } from "@/modules/shared/lib";

export function formatMachineStatus(status: MachineStatus): string {
  return capitalizeFirstCharacter(status);
}

export function machineStatusTint(status: MachineStatus): Color {
  switch (status) {
    case "running":
      return Color.Green;
    case "starting":
    case "pending":
    case "migrating":
      return Color.Blue;
    case "failed":
      return Color.Red;
    case "destroyed":
      return Color.SecondaryText;
    default:
      return Color.Yellow;
  }
}

export function machineListAccessories(
  machine: Machine,
): List.Item.Accessory[] {
  const accessories: List.Item.Accessory[] = [
    {
      tag: {
        value: formatMachineStatus(machine.status),
        color: machineStatusTint(machine.status),
      },
    },
  ];
  if (machine.region) {
    accessories.push({ text: machine.region });
  }
  return accessories;
}
