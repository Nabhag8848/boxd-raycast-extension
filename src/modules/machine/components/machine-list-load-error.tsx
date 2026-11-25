import { ActionPanel, List } from "@raycast/api";
import {
  API_KEY_REQUIRED_DESCRIPTION,
  API_KEY_REQUIRED_TITLE,
  isMissingApiKeyError,
  OpenPreferencesAction,
  TryAgainAction,
} from "@/modules/shared";
import { MACHINE_LIST_LOAD_ERROR_TITLE } from "@/modules/machine/lib/list-machines-query";
import type { ReactElement } from "react";

type MachineListLoadErrorEmptyViewProps = Readonly<{
  error: Error;
  onRetry: () => void;
}>;

export function MachineListLoadErrorEmptyView({
  error,
  onRetry,
}: MachineListLoadErrorEmptyViewProps): ReactElement {
  const missingKey = isMissingApiKeyError(error);

  return (
    <List.EmptyView
      title={
        missingKey ? API_KEY_REQUIRED_TITLE : MACHINE_LIST_LOAD_ERROR_TITLE
      }
      description={missingKey ? API_KEY_REQUIRED_DESCRIPTION : error.message}
      actions={
        <ActionPanel>
          {missingKey ? (
            <OpenPreferencesAction />
          ) : (
            <TryAgainAction onAction={onRetry} />
          )}
        </ActionPanel>
      }
    />
  );
}
