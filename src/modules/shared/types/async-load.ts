/** Common loading state for UI that depends on an asynchronous data source. */
export type AsyncLoadState = Readonly<{
  error?: Error;
  loading: boolean;
  isEmpty: boolean;
}>;

export function isAsyncLoadReady({
  error,
  loading,
  isEmpty,
}: AsyncLoadState): boolean {
  return !error && !loading && !isEmpty;
}
