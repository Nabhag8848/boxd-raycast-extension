import { ActionPanel } from "@raycast/api";
import {
  OpenPreferencesAction,
  TryAgainAction,
} from "@/modules/shared/errors/actions";
import { ApiKeyRequiredFormDescription } from "@/modules/shared/errors/form/api-key-required-description";
import { FormLoadErrorDescription } from "@/modules/shared/errors/form/load-error-description";
import { isMissingApiKeyError } from "@/modules/shared/errors/api-key";
import type {
  FormAsyncLoadActionsProps,
  FormAsyncLoadDescriptionsProps,
} from "@/modules/shared/errors/types";
import { NoRegionsFormDescription } from "@/modules/shared/errors/form/no-regions-form-description";
import { TRY_AGAIN_ACTION_TITLE } from "@/modules/shared/errors/constants";

export function FormAsyncLoadDescriptions({
  error,
  loading,
  isEmpty,
  loadErrorTitle,
  showNoRegionsEmpty = true,
}: FormAsyncLoadDescriptionsProps) {
  const missingKey = isMissingApiKeyError(error);

  return (
    <>
      {missingKey && <ApiKeyRequiredFormDescription />}
      {error && !missingKey && (
        <FormLoadErrorDescription title={loadErrorTitle} error={error} />
      )}
      {showNoRegionsEmpty && !loading && !error && isEmpty && (
        <NoRegionsFormDescription />
      )}
    </>
  );
}

export function FormAsyncLoadActions({
  error,
  onRetry,
  retryTitle = TRY_AGAIN_ACTION_TITLE,
  submit,
}: FormAsyncLoadActionsProps) {
  const missingKey = isMissingApiKeyError(error);

  return (
    <ActionPanel>
      {missingKey && <OpenPreferencesAction />}
      {error && !missingKey && (
        <TryAgainAction title={retryTitle} onAction={onRetry} />
      )}
      {submit}
    </ActionPanel>
  );
}
