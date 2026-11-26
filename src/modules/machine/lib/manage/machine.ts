import type { Machine } from "@boxd-sh/sdk";
import { withBoxdClient } from "@/lib/boxd";
import type { MachineManageAction } from "@/modules/machine/lib/manage/actions";

export async function manageMachine(
  machine: Machine,
  action: MachineManageAction,
): Promise<void> {
  const id = machine.id;
  const opts = machine.region ? { region: machine.region } : undefined;

  await withBoxdClient(async (client) => {
    switch (action) {
      case "start":
        await client.startMachine(id, opts);
        return;
      case "stop":
        await client.stopMachine(id, opts);
        return;
      case "reboot":
        await client.rebootMachine(id, opts);
        return;
      case "pause":
        await client.pauseMachine(id, opts);
        return;
      case "resume":
        await client.resumeMachine(id, opts);
        return;
      case "hibernate":
        await client.hibernateMachine(id, opts);
        return;
      case "wake":
        await client.wakeMachine(id, opts);
        return;
      case "delete":
        await client.deleteMachine(id, opts);
        return;
    }
  });
}
