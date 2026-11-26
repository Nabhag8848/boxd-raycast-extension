import { Action, ActionPanel, Icon } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import CreateMachine from "@/create-machine";
import {
  confirmDeleteMachine,
  manageMachineWithFeedback,
} from "@/modules/machine/actions";
import {
  machineManageActionIcon,
  machineManageActionLabel,
  machineManageActionsForStatus,
  machineManageActionShortcut,
} from "@/modules/machine/lib/manage/actions";
import {
  MACHINE_LIST_COPY_NAME_ACTION_TITLE,
  MACHINE_LIST_COPY_URL_ACTION_TITLE,
  MACHINE_LIST_COMMANDS_SECTION_TITLE,
  MACHINE_LIST_CREATE_ACTION_TITLE,
  MACHINE_LIST_MANAGE_SECTION_TITLE,
  MACHINE_LIST_OPEN_IN_BROWSER_ACTION_TITLE,
  MACHINE_LIST_REFRESH_ACTION_TITLE,
} from "@/modules/machine/lib/list/constants";
import {
  MACHINE_LIST_COPY_NAME_SHORTCUT,
  MACHINE_LIST_CREATE_SHORTCUT,
  MACHINE_LIST_REFRESH_SHORTCUT,
} from "@/modules/machine/lib/list/shortcuts";
import type { ReactElement } from "react";

type MachineListActionsProps = Readonly<{
  machine: Machine;
  handleRefresh: () => void;
  handleDelete: () => void;
  handleCreate: () => void;
}>;

export function MachineListActions({
  machine,
  handleRefresh,
  handleDelete,
  handleCreate,
}: MachineListActionsProps): ReactElement {
  const manageActions = machineManageActionsForStatus(machine.status);
  const canDelete = machine.status !== "destroyed";
  const showManageSection = manageActions.length > 0 || canDelete;

  return (
    <ActionPanel>
      {machine.access.url ? (
        <Action.OpenInBrowser
          title={MACHINE_LIST_OPEN_IN_BROWSER_ACTION_TITLE}
          url={machine.access.url}
        />
      ) : null}
      {machine.access.url ? (
        <Action.CopyToClipboard
          title={MACHINE_LIST_COPY_URL_ACTION_TITLE}
          content={machine.access.url}
        />
      ) : null}
      <Action.CopyToClipboard
        title={MACHINE_LIST_COPY_NAME_ACTION_TITLE}
        content={machine.name}
        shortcut={MACHINE_LIST_COPY_NAME_SHORTCUT}
      />
      {showManageSection ? (
        <ActionPanel.Section title={MACHINE_LIST_MANAGE_SECTION_TITLE}>
          {manageActions.map((action) => (
            <Action
              key={action}
              title={machineManageActionLabel(action)}
              icon={machineManageActionIcon(action)}
              shortcut={machineManageActionShortcut(action)}
              onAction={() =>
                manageMachineWithFeedback(machine, action, {
                  handleComplete: handleRefresh,
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
              onAction={() => confirmDeleteMachine(machine, { handleDelete })}
            />
          ) : null}
        </ActionPanel.Section>
      ) : null}
      <ActionPanel.Section title={MACHINE_LIST_COMMANDS_SECTION_TITLE}>
        <Action.Push
          title={MACHINE_LIST_CREATE_ACTION_TITLE}
          icon={Icon.Plus}
          shortcut={MACHINE_LIST_CREATE_SHORTCUT}
          target={<CreateMachine handleCreate={handleCreate} />}
        />
      </ActionPanel.Section>
      <Action
        title={MACHINE_LIST_REFRESH_ACTION_TITLE}
        icon={Icon.ArrowClockwise}
        shortcut={MACHINE_LIST_REFRESH_SHORTCUT}
        onAction={handleRefresh}
      />
    </ActionPanel>
  );
}
