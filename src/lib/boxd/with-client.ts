import { BoxdClient, createBoxdClient } from "./client";

export type WithBoxdClientOptions = Readonly<{
  /**
   * Close the transport this many ms after `run` settles. Does not delay the
   * returned promise — only the background {@link BoxdClient.close}.
   */
  closeAfterMs?: number;
}>;

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
  const client = createBoxdClient();
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
