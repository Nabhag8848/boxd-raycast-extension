import { Action, Icon } from "@raycast/api";
import { TRY_AGAIN_ACTION_TITLE } from "@/modules/shared/errors/constants";
import type { TryAgainActionProps } from "@/modules/shared/errors/types";

export function TryAgainAction({
  title = TRY_AGAIN_ACTION_TITLE,
  onAction,
}: TryAgainActionProps) {
  return (
    <Action title={title} icon={Icon.ArrowClockwise} onAction={onAction} />
  );
}
