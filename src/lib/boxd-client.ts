import { getPreferenceValues } from "@raycast/api";
import { MISSING_API_KEY_CODE } from "@/modules/shared/errors/api-key";
import { Boxd } from "@boxd-sh/sdk";
import type {
  Machine,
  MachineCreateParams,
  MachineListParams,
  Region,
  RegionOption,
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

  async listRegions(params?: { org?: string }): Promise<Region[]> {
    return this.client.regions.list(params);
  }

  async getOrgDefaultRegion(org?: string): Promise<string | null> {
    return this.client.orgs.getDefaultRegion(org);
  }

  async listMachines(params?: MachineListParams): Promise<Machine[]> {
    return this.client.machines.list(params);
  }

  async createMachine(params: MachineCreateParams): Promise<Machine> {
    return this.client.machines.create(params);
  }

  async deleteMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.delete(id, opts);
  }

  async startMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.start(id, opts);
  }

  async stopMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.stop(id, opts);
  }

  async rebootMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.reboot(id, opts);
  }

  async pauseMachine(
    id: string,
    opts?: RegionOption,
  ): Promise<{ suspendUs: number }> {
    return this.client.machines.pause(id, opts);
  }

  async resumeMachine(
    id: string,
    opts?: RegionOption,
  ): Promise<{ resumeUs: number }> {
    return this.client.machines.resume(id, opts);
  }

  async hibernateMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.hibernate(id, opts);
  }

  async wakeMachine(id: string, opts?: RegionOption): Promise<void> {
    return this.client.machines.wake(id, opts);
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}

/**
 * Shared client for command views — region changes and revalidates keep using it.
 * Prefer {@link withBoxdClient} when a single operation should tear down the channel.
 */
export const boxdClient = new BoxdClient(new Boxd({ apiKey: requireApiKey() }));

export type WithBoxdClientOptions = Readonly<{
  /**
   * Close the transport this many ms after `run` settles. Does not delay the
   * returned promise — only the background {@link BoxdClient.close}.
   */
  closeAfterMs?: number;
}>;

function createEphemeralBoxdClient(): BoxdClient {
  return new BoxdClient(new Boxd({ apiKey: requireApiKey() }));
}

function closeBoxdClientAfter(client: BoxdClient, delayMs: number): void {
  setTimeout(() => {
    void client.close();
  }, delayMs);
}

/** One client per call: run work, then {@link BoxdClient.close} in `finally`. */
export async function withBoxdClient<T>(
  run: (client: BoxdClient) => Promise<T>,
  options?: WithBoxdClientOptions,
): Promise<T> {
  const client = createEphemeralBoxdClient();
  try {
    return await run(client);
  } finally {
    const closeAfterMs = options?.closeAfterMs;
    if (closeAfterMs !== undefined && closeAfterMs > 0) {
      closeBoxdClientAfter(client, closeAfterMs);
    } else {
      await client.close();
    }
  }
}
