import type { MachineStatus } from "@boxd-sh/sdk";
import { Icon, Keyboard } from "@raycast/api";
import type { Image } from "@raycast/api";
import {
  capitalizeFirstCharacter,
  platformShortcut,
} from "@/modules/shared/lib";

/** SDK `Machines` methods used from the list (`start`, `stop`, `delete`, …). */
export type MachineManageAction =
  | "pause"
  | "resume"
  | "hibernate"
  | "wake"
  | "stop"
  | "start"
  | "reboot"
  | "delete";

function formatManageActionLabel(action: MachineManageAction): string {
  return capitalizeFirstCharacter(action);
}

export function machineManageActionLabel(action: MachineManageAction): string {
  return formatManageActionLabel(action);
}

export function machineManageProgressTitle(label: string): string {
  return `${label}…`;
}

export function machineManageFailureTitle(action: MachineManageAction): string {
  return `Could not ${action}`;
}

const MANAGE_ACTION_ICON: Readonly<
  Record<MachineManageAction, Image.ImageLike>
> = {
  pause: Icon.Pause,
  resume: Icon.Play,
  hibernate: Icon.Moon,
  wake: Icon.Moonrise,
  stop: Icon.Stop,
  start: Icon.Play,
  reboot: Icon.ArrowClockwise,
  delete: Icon.Trash,
};

export function machineManageActionIcon(
  action: MachineManageAction,
): Image.ImageLike {
  return MANAGE_ACTION_ICON[action];
}

const MANAGE_ACTION_SHORTCUT: Readonly<
  Record<MachineManageAction, Keyboard.Shortcut>
> = {
  pause: platformShortcut("p", ["cmd", "shift"]),
  resume: platformShortcut("r", ["cmd", "shift"]),
  hibernate: platformShortcut("h", ["cmd", "shift"]),
  wake: platformShortcut("w", ["cmd", "shift"]),
  stop: platformShortcut("x", ["cmd", "shift"]),
  start: platformShortcut("s", ["cmd", "shift"]),
  reboot: platformShortcut("r", ["cmd", "shift"]),
  delete: platformShortcut("d"),
};

/** List action panel shortcuts for {@link MachineManageAction}. */
export function machineManageActionShortcut(
  action: MachineManageAction,
): Keyboard.Shortcut {
  return MANAGE_ACTION_SHORTCUT[action];
}

const FOR_STATUS_RUNNING: readonly MachineManageAction[] = [
  "pause",
  "hibernate",
  "stop",
  "reboot",
];
const FOR_STATUS_SUSPENDED: readonly MachineManageAction[] = ["resume", "stop"];
const FOR_STATUS_HIBERNATED: readonly MachineManageAction[] = ["wake"];
const FOR_STATUS_STOPPED: readonly MachineManageAction[] = ["start"];
const FOR_STATUS_FAILED: readonly MachineManageAction[] = ["start"];
const FOR_STATUS_TRANSITIONAL: readonly MachineManageAction[] = ["stop"];

/** Status-gated manage actions (`delete` is offered separately when not `destroyed`). */
export function machineManageActionsForStatus(
  status: MachineStatus,
): readonly MachineManageAction[] {
  switch (status) {
    case "running":
      return FOR_STATUS_RUNNING;
    case "suspended":
      return FOR_STATUS_SUSPENDED;
    case "hibernated":
      return FOR_STATUS_HIBERNATED;
    case "stopped":
      return FOR_STATUS_STOPPED;
    case "failed":
      return FOR_STATUS_FAILED;
    case "pending":
    case "starting":
    case "migrating":
      return FOR_STATUS_TRANSITIONAL;
    case "destroyed":
      return [];
    default:
      return [];
  }
}
