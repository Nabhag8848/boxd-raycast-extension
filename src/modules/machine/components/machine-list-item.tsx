import { Icon, List } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { MachineListActions } from "@/modules/machine/components/machine-list-actions";
import {
  machineListAccessories,
  machineStatusTint,
} from "@/modules/machine/lib/machine-list";
import { machineListItemKeywords } from "@/modules/machine/lib/list-machines-query";
import type { ReactElement } from "react";

type MachineListItemProps = Readonly<{
  machine: Machine;
  onRefresh: () => void;
  onDeleted: () => void;
}>;

export function MachineListItem({
  machine,
  onRefresh,
  onDeleted,
}: MachineListItemProps): ReactElement {
  return (
    <List.Item
      title={machine.name}
      subtitle={machine.access.url || undefined}
      keywords={machineListItemKeywords(machine)}
      icon={{
        source: Icon.HardDrive,
        tintColor: machineStatusTint(machine.status),
      }}
      accessories={machineListAccessories(machine)}
      actions={
        <MachineListActions
          machine={machine}
          onRefresh={onRefresh}
          onDeleted={onDeleted}
        />
      }
    />
  );
}
