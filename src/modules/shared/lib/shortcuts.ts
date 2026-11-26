import { Keyboard } from "@raycast/api";

/** A keyboard shortcut using Command on macOS and Control on Windows. */
export function platformShortcut(
  key: Keyboard.KeyEquivalent,
  modifiers: Keyboard.KeyModifier[] = ["cmd"],
): Keyboard.Shortcut {
  return {
    macOS: { modifiers, key },
    Windows: {
      modifiers: modifiers.map((modifier) =>
        modifier === "cmd" ? "ctrl" : modifier,
      ),
      key,
    },
  };
}
