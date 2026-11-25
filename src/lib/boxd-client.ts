import { getPreferenceValues } from "@raycast/api";
import { Boxd } from "@boxd-sh/sdk";
import type { Machine, MachineListParams } from "@boxd-sh/sdk";

function requireApiKey(): string {
  const key = getPreferenceValues<Preferences>().apiKey?.trim();
  if (!key) {
    throw new Error("missing-api-key");
  }
  return key;
}

export class BoxdClient {
  constructor(private readonly client: Boxd) {}

  /** Underlying SDK when a command needs an API not wrapped here yet. */
  get sdk(): Boxd {
    return this.client;
  }

  async listMachines(params?: MachineListParams): Promise<Machine[]> {
    return this.client.machines.list({ region: "all", ...params });
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}

export const boxdClient = new BoxdClient(new Boxd({ apiKey: requireApiKey() }));
