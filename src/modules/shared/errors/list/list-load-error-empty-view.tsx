import { ActionPanel, List } from "@raycast/api";
import {
  OpenPreferencesAction,
  TryAgainAction,
} from "@/modules/shared/errors/actions";
import {
  API_KEY_REQUIRED_DESCRIPTION,
  API_KEY_REQUIRED_TITLE,
  isMissingApiKeyError,
} from "@/modules/shared/errors/api-key";
import type { ListLoadErrorEmptyViewProps } from "@/modules/shared/errors/types";
import type { ReactElement } from "react";

export function ListLoadErrorEmptyView({
  error,
  loadErrorTitle,
  onRetry,
}: ListLoadErrorEmptyViewProps): ReactElement {
  const missingKey = isMissingApiKeyError(error);

  return (
    <List.EmptyView
      title={missingKey ? API_KEY_REQUIRED_TITLE : loadErrorTitle}
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
