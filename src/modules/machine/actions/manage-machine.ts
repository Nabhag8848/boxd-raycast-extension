import { showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import {
  machineManageActionLabel,
  type MachineManageAction,
} from "@/modules/machine/lib/manage-actions";
import { manageMachine } from "@/modules/machine/lib/manage-machine";

type ManageMachineWithFeedbackOptions = Readonly<{
  onComplete?: () => void;
}>;

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
    onComplete?.();
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
