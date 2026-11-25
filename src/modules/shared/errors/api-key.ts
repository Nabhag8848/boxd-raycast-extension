export const MISSING_API_KEY_CODE = "missing-api-key";

export const API_KEY_REQUIRED_TITLE = "API key required";

export const API_KEY_REQUIRED_DESCRIPTION =
  "Add your API key in extension preferences.";

export function isMissingApiKeyError(error: Error | undefined): boolean {
  return error?.message === MISSING_API_KEY_CODE;
}
