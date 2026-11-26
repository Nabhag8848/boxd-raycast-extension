import { showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import {
  machineManageActionLabel,
  machineManageFailureTitle,
  machineManageProgressTitle,
  type MachineManageAction,
} from "@/modules/machine/lib/manage/actions";
import { START_MACHINE_STATUS_REFRESH_DELAY_MS } from "@/modules/machine/lib/manage/constants";
import { manageMachine } from "@/modules/machine/lib/manage/machine";
import { getErrorMessage } from "@/modules/shared/errors";

type ManageMachineWithFeedbackOptions = Readonly<{
  handleComplete?: () => void;
}>;

function runHandleComplete(
  action: MachineManageAction,
  handleComplete?: () => void,
): void {
  if (!handleComplete) {
    return;
  }
  handleComplete();
  if (action === "start") {
    setTimeout(handleComplete, START_MACHINE_STATUS_REFRESH_DELAY_MS);
  }
}

export async function manageMachineWithFeedback(
  machine: Machine,
  action: MachineManageAction,
  { handleComplete }: ManageMachineWithFeedbackOptions = {},
): Promise<void> {
  const label = machineManageActionLabel(action);
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: machineManageProgressTitle(label),
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
    runHandleComplete(action, handleComplete);
  } catch (error) {
    await toast.hide();
    const message = getErrorMessage(error);
    await showToast({
      style: Toast.Style.Failure,
      title: machineManageFailureTitle(action),
      message,
    });
  }
}
