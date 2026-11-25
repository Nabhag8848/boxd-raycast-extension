import { showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import {
  machineManageActionLabel,
  type MachineManageAction,
} from "@/modules/machine/lib/manage-actions";
import { manageMachine } from "@/modules/machine/lib/manage-machine";

/** Extra list refresh after start — status often lags before `running`. */
const START_MACHINE_FOLLOW_UP_REFRESH_MS = 2000;

type ManageMachineWithFeedbackOptions = Readonly<{
  onComplete?: () => void;
}>;

function runOnComplete(
  action: MachineManageAction,
  onComplete?: () => void,
): void {
  if (!onComplete) {
    return;
  }
  onComplete();
  if (action === "start") {
    setTimeout(onComplete, START_MACHINE_FOLLOW_UP_REFRESH_MS);
  }
}

export async function manageMachineWithFeedback(
  machine: Machine,
  action: MachineManageAction,
  { onComplete }: ManageMachineWithFeedbackOptions = {},
): Promise<void> {
  const label = machineManageActionLabel(action);
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: `${label}…`,
    message: machine.name,
  });

  try {
    await manageMachine(machine, action);
    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: label,
      message: machine.name,
    });
    runOnComplete(action, onComplete);
  } catch (error) {
    await toast.hide();
    const message = error instanceof Error ? error.message : "Request failed";
    await showToast({
      style: Toast.Style.Failure,
      title: `Could not ${action}`,
      message,
    });
  }
}
