import { BoxdClient, createBoxdClient } from "./client";

/** One client per call: run work, then {@link BoxdClient.close} in `finally`. */
export async function withBoxdClient<T>(
  run: (client: BoxdClient) => Promise<T>,
): Promise<T> {
  const client = createBoxdClient();
  try {
    return await run(client);
  } finally {
    await client.close();
  }
}
