import { getPreferenceValues } from "@raycast/api";

export const DEFAULT_BOXD_API_BASE_URL = "https://boxd.sh:9443";

const CONSOLE_SUBDOMAIN_PREFIX = "app.";
const SECURE_URL_PROTOCOL = "https:";

type BoxdPreferences = Readonly<{
  apiBaseUrl?: string;
}>;

export function boxdApiBaseUrl(): string {
  return (
    getPreferenceValues<BoxdPreferences>().apiBaseUrl?.trim() ||
    DEFAULT_BOXD_API_BASE_URL
  );
}

export function boxdConsoleBaseUrl(): string {
  const apiUrl = new URL(normalizedUrl(boxdApiBaseUrl()));
  const consoleHost = apiUrl.hostname.startsWith(CONSOLE_SUBDOMAIN_PREFIX)
    ? apiUrl.hostname
    : `${CONSOLE_SUBDOMAIN_PREFIX}${apiUrl.hostname}`;

  return `${SECURE_URL_PROTOCOL}//${consoleHost}`;
}

function normalizedUrl(value: string): string {
  return value.includes("://") ? value : `https://${value}`;
}
