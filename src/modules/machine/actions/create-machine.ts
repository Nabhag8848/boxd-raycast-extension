import { popToRoot, showToast, Toast } from "@raycast/api";
import type { Machine } from "@boxd-sh/sdk";
import { withBoxdClient } from "@/lib/boxd";
import {
  toMachineCreateParams,
  type CreateMachineFormInput,
  type RegionPlacementContext,
} from "@/modules/machine/lib/create";

export async function createMachineWithFeedback(
  values: CreateMachineFormInput,
  placementContext: RegionPlacementContext,
): Promise<Machine> {
  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Creating machine…",
  });

  try {
    const machine = await withBoxdClient((client) =>
      client.createMachine(
        toMachineCreateParams(
          {
            name: values.name,
            region: values.region,
            size: values.size,
            isolated: values.isolated,
          },
          placementContext,
        ),
      ),
    );

    await toast.hide();
    await showToast({
      style: Toast.Style.Success,
      title: "Machine created",
      message: machine.name,
    });
    await popToRoot();
    return machine;
  } catch (error) {
    await toast.hide();
    const message = error instanceof Error ? error.message : "Request failed";
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not create machine",
      message,
    });
    throw new Error(message);
  }
}
