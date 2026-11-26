import { Icon, List } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { MachineListActions } from "@/modules/machine/components/list/machine-list-actions";
import {
  machineListAccessories,
  machineStatusTint,
} from "@/modules/machine/lib/list/display";
import { machineListItemKeywords } from "@/modules/machine/lib/list/query";
import type { ReactElement } from "react";

type MachineListItemProps = Readonly<{
  machine: Machine;
  handleRefresh: () => void;
  handleDelete: () => void;
  handleCreate: () => void;
}>;

export function MachineListItem({
  machine,
  handleRefresh,
  handleDelete,
  handleCreate,
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
          handleRefresh={handleRefresh}
          handleDelete={handleDelete}
          handleCreate={handleCreate}
        />
      }
    />
  );
}
