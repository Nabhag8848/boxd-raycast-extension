import { Action, Icon, openExtensionPreferences } from "@raycast/api";

export function OpenPreferencesAction() {
  return (
    <Action
      title="Open Preferences"
      icon={Icon.Gear}
      onAction={openExtensionPreferences}
    />
  );
}
