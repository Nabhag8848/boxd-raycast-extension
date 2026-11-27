import { Alert, confirmAlert, showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import {
  DELETE_MACHINE_CONFIRMATION_ACTION_TITLE,
  DELETE_MACHINE_CONFIRMATION_MESSAGE,
  DELETE_MACHINE_FAILURE_TITLE,
  DELETE_MACHINE_PROGRESS_TITLE,
  DELETE_MACHINE_SUCCESS_TITLE,
  deleteMachineConfirmationTitle,
} from "@/modules/machine/lib/manage/constants";
import { manageMachine } from "@/modules/machine/lib/manage/machine";
import { getErrorMessage } from "@/modules/shared/errors";

type ConfirmDeleteMachineOptions = Readonly<{
  handleMachineDelete?: () => void;
}>;

export async function confirmDeleteMachine(
  machine: Machine,
  { handleMachineDelete }: ConfirmDeleteMachineOptions = {},
): Promise<void> {
  const confirmed = await confirmAlert({
    title: deleteMachineConfirmationTitle(machine.name),
    message: DELETE_MACHINE_CONFIRMATION_MESSAGE,
    primaryAction: {
      title: DELETE_MACHINE_CONFIRMATION_ACTION_TITLE,
      style: Alert.ActionStyle.Destructive,
    },
  });

  if (!confirmed) {
    return;
  }

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: DELETE_MACHINE_PROGRESS_TITLE,
  });

  try {
    await manageMachine(machine, "delete");
    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: DELETE_MACHINE_SUCCESS_TITLE,
      message: machine.name,
    });
    handleMachineDelete?.();
  } catch (error) {
    await toast.hide();
    const message = getErrorMessage(error);
    await showToast({
      style: Toast.Style.Failure,
      title: DELETE_MACHINE_FAILURE_TITLE,
      message,
    });
  }
}
