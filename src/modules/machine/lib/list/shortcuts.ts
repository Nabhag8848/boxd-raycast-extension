import { platformShortcut } from "@/modules/shared/lib";

export const MACHINE_LIST_COPY_NAME_SHORTCUT = platformShortcut("n");
export const MACHINE_LIST_COPY_URL_SHORTCUT = platformShortcut("u");
export const MACHINE_LIST_OPEN_DESKTOP_SHORTCUT = platformShortcut("d");
export const MACHINE_LIST_OPEN_TERMINAL_SHORTCUT = platformShortcut("t");
export const MACHINE_LIST_CREATE_SHORTCUT = platformShortcut("n", [
  "cmd",
  "shift",
]);
export const MACHINE_LIST_REFRESH_SHORTCUT = platformShortcut("r");
