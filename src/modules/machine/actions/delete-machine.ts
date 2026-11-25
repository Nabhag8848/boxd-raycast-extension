import { Alert, confirmAlert, showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { DELETE_MACHINE_SHORTCUT } from "@/modules/machine/lib/manage-actions";
import { manageMachine } from "@/modules/machine/lib/manage-machine";

export { DELETE_MACHINE_SHORTCUT };

type ConfirmDeleteMachineOptions = Readonly<{
  onDeleted?: () => void;
}>;

export async function confirmDeleteMachine(
  machine: Machine,
  { onDeleted }: ConfirmDeleteMachineOptions = {},
): Promise<void> {
  const confirmed = await confirmAlert({
    title: `Delete “${machine.name}”?`,
    message: "This permanently destroys the machine and its disk.",
    primaryAction: {
      title: "Delete",
      style: Alert.ActionStyle.Destructive,
    },
  });

  if (!confirmed) {
    return;
  }

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Deleting machine…",
  });

  try {
    await manageMachine(machine, "delete");
    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: "Machine deleted",
      message: machine.name,
    });
    onDeleted?.();
  } catch (error) {
    await toast.hide();
    const message = error instanceof Error ? error.message : "Request failed";
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not delete machine",
      message,
    });
  }
}
