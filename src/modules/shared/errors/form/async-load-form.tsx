import { ActionPanel } from "@raycast/api";
import {
  OpenPreferencesAction,
  TryAgainAction,
} from "@/modules/shared/errors/actions";
import { ApiKeyRequiredFormDescription } from "@/modules/shared/errors/form/api-key-required-description";
import { FormLoadErrorDescription } from "@/modules/shared/errors/form/load-error-description";
import { isMissingApiKeyError } from "@/modules/shared/errors/api-key";
import type {
  FormLoadErrorActionsProps,
  FormLoadErrorDescriptionsProps,
} from "@/modules/shared/errors/types";
import { NoRegionsFormDescription } from "@/modules/shared/errors/form/no-regions-form-description";

export function FormLoadErrorDescriptions({
  error,
  loading,
  isEmpty,
  loadErrorTitle,
  showNoRegionsEmpty = true,
}: FormLoadErrorDescriptionsProps) {
  const missingKey = isMissingApiKeyError(error);

  return (
    <>
      {missingKey ? <ApiKeyRequiredFormDescription /> : null}
      {error && !missingKey ? (
        <FormLoadErrorDescription title={loadErrorTitle} error={error} />
      ) : null}
      {showNoRegionsEmpty && !loading && !error && isEmpty ? (
        <NoRegionsFormDescription />
      ) : null}
    </>
  );
}

export function FormLoadErrorActions({
  error,
  onRetry,
  retryTitle = "Try Again",
  submit,
}: FormLoadErrorActionsProps) {
  const missingKey = isMissingApiKeyError(error);

  return (
    <ActionPanel>
      {missingKey ? <OpenPreferencesAction /> : null}
      {error && !missingKey ? (
        <TryAgainAction title={retryTitle} onAction={onRetry} />
      ) : null}
      {submit}
    </ActionPanel>
  );
}
