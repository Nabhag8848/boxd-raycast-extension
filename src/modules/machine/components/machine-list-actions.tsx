import { Action, ActionPanel, Icon } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import {
  confirmDeleteMachine,
  manageMachineWithFeedback,
} from "@/modules/machine/actions";
import {
  machineManageActionIcon,
  machineManageActionLabel,
  machineManageActionsForStatus,
  machineManageActionShortcut,
} from "@/modules/machine/lib/manage-actions";
import type { ReactElement } from "react";

type MachineListActionsProps = Readonly<{
  machine: Machine;
  onRefresh: () => void;
  onDeleted: () => void;
}>;

export function MachineListActions({
  machine,
  onRefresh,
  onDeleted,
}: MachineListActionsProps): ReactElement {
  const manageActions = machineManageActionsForStatus(machine.status);
  const canDelete = machine.status !== "destroyed";
  const showManageSection = manageActions.length > 0 || canDelete;

  return (
    <ActionPanel>
      {machine.access.url ? (
        <Action.OpenInBrowser
          title="Open in Browser"
          url={machine.access.url}
        />
      ) : null}
      {machine.access.url ? (
        <Action.CopyToClipboard title="Copy URL" content={machine.access.url} />
      ) : null}
      <Action.CopyToClipboard title="Copy Name" content={machine.name} />
      {showManageSection ? (
        <ActionPanel.Section title="Manage Machine">
          {manageActions.map((action) => (
            <Action
              key={action}
              title={machineManageActionLabel(action)}
              icon={machineManageActionIcon(action)}
              shortcut={machineManageActionShortcut(action)}
              onAction={() =>
                manageMachineWithFeedback(machine, action, {
                  onComplete: onRefresh,
                })
              }
            />
          ))}
          {canDelete ? (
            <Action
              title={machineManageActionLabel("delete")}
              icon={machineManageActionIcon("delete")}
              shortcut={machineManageActionShortcut("delete")}
              style={Action.Style.Destructive}
              onAction={() => confirmDeleteMachine(machine, { onDeleted })}
            />
          ) : null}
        </ActionPanel.Section>
      ) : null}
      <Action title="Refresh" icon={Icon.ArrowClockwise} onAction={onRefresh} />
    </ActionPanel>
  );
}
