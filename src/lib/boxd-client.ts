import { getPreferenceValues } from "@raycast/api";
import { MISSING_API_KEY_CODE } from "@/modules/shared/errors/api-key";
import { Boxd } from "@boxd-sh/sdk";
import type {
  Machine,
  MachineCreateParams,
  MachineListParams,
  Region,
} from "@boxd-sh/sdk";

function requireApiKey(): string {
  const key = getPreferenceValues<Preferences>().apiKey?.trim();
  if (!key) {
    throw new Error(MISSING_API_KEY_CODE);
  }
  return key;
}

export class BoxdClient {
  constructor(private readonly client: Boxd) {}

  /** Underlying SDK when a command needs an API not wrapped here yet. */
  get sdk(): Boxd {
    return this.client;
  }

  async listRegions(params?: { org?: string }): Promise<Region[]> {
    return this.client.regions.list(params);
  }

  async listMachines(params?: MachineListParams): Promise<Machine[]> {
    return this.client.machines.list(params);
  }

  async createMachine(params: MachineCreateParams): Promise<Machine> {
    return this.client.machines.create(params);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}

export const boxdClient = new BoxdClient(new Boxd({ apiKey: requireApiKey() }));
