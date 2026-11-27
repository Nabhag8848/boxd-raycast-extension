import type { Machine } from "@boxd-sh/sdk";
import { boxdClient } from "@/lib/boxd";
import type { MachineManageAction } from "@/modules/machine/lib/manage/actions";

export async function manageMachine(
  machine: Machine,
  action: MachineManageAction,
): Promise<void> {
  const id = machine.id;
  const opts = machine.region ? { region: machine.region } : undefined;

  switch (action) {
    case "start":
      await boxdClient.startMachine(id, opts);
      return;
    case "stop":
      await boxdClient.stopMachine(id, opts);
      return;
    case "reboot":
      await boxdClient.rebootMachine(id, opts);
      return;
    case "pause":
      await boxdClient.pauseMachine(id, opts);
      return;
    case "resume":
      await boxdClient.resumeMachine(id, opts);
      return;
    case "hibernate":
      await boxdClient.hibernateMachine(id, opts);
      return;
    case "wake":
      await boxdClient.wakeMachine(id, opts);
      return;
    case "delete":
      await boxdClient.deleteMachine(id, opts);
      return;
  }
}
