import { Action, Icon, openExtensionPreferences } from "@raycast/api";
import { OPEN_PREFERENCES_ACTION_TITLE } from "@/modules/shared/errors/constants";

export function OpenPreferencesAction() {
  return (
    <Action
      title={OPEN_PREFERENCES_ACTION_TITLE}
      icon={Icon.Gear}
      onAction={openExtensionPreferences}
    />
  );
}
