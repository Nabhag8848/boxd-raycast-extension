import { showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { boxdClient } from "@/lib/boxd";
import {
  MACHINE_CREATE_FAILURE_TITLE,
  MACHINE_CREATE_PROGRESS_TITLE,
  MACHINE_CREATE_SUCCESS_TITLE,
  toMachineCreateParams,
  type CreateMachineFormInput,
  type RegionPlacementContext,
} from "@/modules/machine/lib/create";
import { getErrorMessage } from "@/modules/shared/errors";

type CreateMachineWithFeedbackArgs = Readonly<{
  values: CreateMachineFormInput;
  placementContext: RegionPlacementContext;
}>;

export async function createMachineWithFeedback({
  values,
  placementContext,
}: CreateMachineWithFeedbackArgs): Promise<Machine> {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: MACHINE_CREATE_PROGRESS_TITLE,
  });

  try {
    const machine = await boxdClient.createMachine(
      toMachineCreateParams(
        {
          name: values.name,
          region: values.region,
          size: values.size,
          os: values.os,
          isolated: values.isolated,
        },
        placementContext,
      ),
    );
    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: MACHINE_CREATE_SUCCESS_TITLE,
      message: machine.name,
    });
    return machine;
  } catch (error) {
    await toast.hide();
    const message = getErrorMessage(error);
    await showToast({
      style: Toast.Style.Failure,
      title: MACHINE_CREATE_FAILURE_TITLE,
      message,
    });
    throw new Error(message);
  }
}
