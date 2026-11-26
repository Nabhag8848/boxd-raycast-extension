/** Async data a list needs before its items can render (loading, error, empty). */
export type ListLoadErrorEmptyViewProps = Readonly<{
  error: Error;
  loadErrorTitle: string;
  onRetry: () => void;
}>;
