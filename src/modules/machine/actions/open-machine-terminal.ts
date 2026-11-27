import { showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { getErrorMessage } from "@/modules/shared/errors";
import {
  openMacosTerminal,
  openWindowsTerminal,
} from "@/modules/machine/lib/terminal";
import {
  TERMINAL_OPENED_TOAST_TITLE,
  TERMINAL_OPEN_FAILED_TOAST_TITLE,
  TERMINAL_OPENING_TOAST_TITLE,
} from "@/modules/machine/lib/terminal/constants";

export async function openMachineInTerminal(machine: Machine): Promise<void> {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: TERMINAL_OPENING_TOAST_TITLE,
    message: machine.name,
  });

  try {
    switch (process.platform) {
      case "win32":
        await openWindowsTerminal(machine);
        break;
      default:
        await openMacosTerminal(machine);
        break;
    }

    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: TERMINAL_OPENED_TOAST_TITLE,
      message: machine.name,
    });
  } catch (error) {
    await toast.hide();
    await showToast({
      style: Toast.Style.Failure,
      title: TERMINAL_OPEN_FAILED_TOAST_TITLE,
      message: getErrorMessage(error),
    });
  }
}
