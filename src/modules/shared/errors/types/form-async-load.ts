import type { ReactNode } from "react";

/** Async data a form needs before its fields can render (loading, error, empty). */
export type FormAsyncLoadState = Readonly<{
  error?: Error;
  loading: boolean;
  isEmpty: boolean;
}>;

export type FormLoadErrorDescriptionsProps = FormAsyncLoadState &
  Readonly<{
    loadErrorTitle: string;
    showNoRegionsEmpty?: boolean;
  }>;

export type FormLoadErrorActionsProps = Readonly<{
  error?: Error;
  onRetry: () => void;
  retryTitle?: string;
  submit?: ReactNode;
}>;

export function isFormAsyncLoadReady({
  error,
  loading,
  isEmpty,
}: FormAsyncLoadState): boolean {
  return !error && !loading && !isEmpty;
}
