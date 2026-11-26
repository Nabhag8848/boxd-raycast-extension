import { REQUEST_FAILED_MESSAGE } from "@/modules/shared/errors/constants";

/** Human-readable text for an unknown failure at a UI boundary. */
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : REQUEST_FAILED_MESSAGE;
}
