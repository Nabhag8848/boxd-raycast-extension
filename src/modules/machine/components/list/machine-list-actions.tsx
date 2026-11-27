import { Action, ActionPanel, Icon } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import CreateMachine from "@/create-machine";
import {
  confirmDeleteMachine,
  manageMachineWithFeedback,
  openMachineInTerminal,
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
  MACHINE_LIST_ACCESS_SECTION_TITLE,
  MACHINE_LIST_COMMANDS_SECTION_TITLE,
  MACHINE_LIST_CREATE_ACTION_TITLE,
  MACHINE_LIST_MANAGE_SECTION_TITLE,
  MACHINE_LIST_OPEN_CONSOLE_ACTION_TITLE,
  MACHINE_LIST_OPEN_DESKTOP_ACTION_TITLE,
  MACHINE_LIST_OPEN_TERMINAL_ACTION_TITLE,
  MACHINE_LIST_REFRESH_ACTION_TITLE,
} from "@/modules/machine/lib/list/constants";
import {
  MACHINE_LIST_COPY_NAME_SHORTCUT,
  MACHINE_LIST_COPY_URL_SHORTCUT,
  MACHINE_LIST_CREATE_SHORTCUT,
  MACHINE_LIST_OPEN_DESKTOP_SHORTCUT,
  MACHINE_LIST_OPEN_TERMINAL_SHORTCUT,
  MACHINE_LIST_REFRESH_SHORTCUT,
} from "@/modules/machine/lib/list/shortcuts";
import { boxdConsoleMachineUrl } from "@/modules/machine/lib/list/urls";
import { canOpenTerminal } from "@/modules/machine/lib/terminal";
import type { ReactElement } from "react";

type MachineListActionsProps = Readonly<{
  machine: Machine;
  handleMachineListRefresh: () => void;
  handleMachineDelete: () => void;
  handleMachineCreate: () => void;
}>;

export function MachineListActions({
  machine,
  handleMachineListRefresh,
  handleMachineDelete,
  handleMachineCreate,
}: MachineListActionsProps): ReactElement {
  const manageActions = machineManageActionsForStatus(machine.status);
  const canDelete = machine.status !== "destroyed";
  const showManageSection = manageActions.length > 0 || canDelete;

  return (
    <ActionPanel>
      <ActionPanel.Section title={MACHINE_LIST_ACCESS_SECTION_TITLE}>
        <Action.OpenInBrowser
          title={MACHINE_LIST_OPEN_CONSOLE_ACTION_TITLE}
          url={boxdConsoleMachineUrl(machine)}
        />
        {machine.access.desktopUrl ? (
          <Action.OpenInBrowser
            title={MACHINE_LIST_OPEN_DESKTOP_ACTION_TITLE}
            url={machine.access.desktopUrl}
            shortcut={MACHINE_LIST_OPEN_DESKTOP_SHORTCUT}
          />
        ) : null}
        {canOpenTerminal(machine.status) && (
          <Action
            title={MACHINE_LIST_OPEN_TERMINAL_ACTION_TITLE}
            icon={Icon.Terminal}
            shortcut={MACHINE_LIST_OPEN_TERMINAL_SHORTCUT}
            onAction={() => openMachineInTerminal(machine)}
          />
        )}
        {machine.access.url ? (
          <Action.CopyToClipboard
            title={MACHINE_LIST_COPY_URL_ACTION_TITLE}
            content={machine.access.url}
            shortcut={MACHINE_LIST_COPY_URL_SHORTCUT}
          />
        ) : null}
        <Action.CopyToClipboard
          title={MACHINE_LIST_COPY_NAME_ACTION_TITLE}
          content={machine.name}
          shortcut={MACHINE_LIST_COPY_NAME_SHORTCUT}
        />
      </ActionPanel.Section>
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
                  handleMachineActionComplete: handleMachineListRefresh,
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
              onAction={() =>
                confirmDeleteMachine(machine, { handleMachineDelete })
              }
            />
          ) : null}
        </ActionPanel.Section>
      ) : null}
      <ActionPanel.Section title={MACHINE_LIST_COMMANDS_SECTION_TITLE}>
        <Action.Push
          title={MACHINE_LIST_CREATE_ACTION_TITLE}
          icon={Icon.Plus}
          shortcut={MACHINE_LIST_CREATE_SHORTCUT}
          target={<CreateMachine handleMachineCreate={handleMachineCreate} />}
        />
        <Action
          title={MACHINE_LIST_REFRESH_ACTION_TITLE}
          icon={Icon.ArrowClockwise}
          shortcut={MACHINE_LIST_REFRESH_SHORTCUT}
          onAction={handleMachineListRefresh}
        />
      </ActionPanel.Section>
    </ActionPanel>
  );
}
