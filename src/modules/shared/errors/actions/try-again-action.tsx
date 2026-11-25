import { Action, Icon } from "@raycast/api";
import type { TryAgainActionProps } from "@/modules/shared/errors/types";

export function TryAgainAction({
  title = "Try Again",
  onAction,
}: TryAgainActionProps) {
  return (
    <Action title={title} icon={Icon.ArrowClockwise} onAction={onAction} />
  );
}
