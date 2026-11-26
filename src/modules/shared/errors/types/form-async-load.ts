import type { ReactNode } from "react";
import type { AsyncLoadState } from "@/modules/shared/types";

export type FormAsyncLoadDescriptionsProps = AsyncLoadState &
  Readonly<{
    loadErrorTitle: string;
    showNoRegionsEmpty?: boolean;
  }>;

export type FormAsyncLoadActionsProps = Readonly<{
  error?: Error;
  onRetry: () => void;
  retryTitle?: string;
  submit?: ReactNode;
}>;
