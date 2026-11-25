/** Async data a list needs before its items can render (loading, error, empty). */
export type ListAsyncLoadState = Readonly<{
  error?: Error;
  loading: boolean;
  isEmpty: boolean;
}>;

export type ListLoadErrorEmptyViewProps = Readonly<{
  error: Error;
  loadErrorTitle: string;
  onRetry: () => void;
}>;

export function isListAsyncLoadReady({
  error,
  loading,
  isEmpty,
}: ListAsyncLoadState): boolean {
  return !error && !loading && !isEmpty;
}
