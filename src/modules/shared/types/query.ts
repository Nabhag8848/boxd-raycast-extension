/** Shared shape for `usePromise` / async hooks (`data`, loading, error, reload). */
export type AsyncSlice<TData> = Readonly<{
  data: TData | undefined;
  error: Error | undefined;
  isLoading: boolean;
  revalidate: () => void;
}>;
