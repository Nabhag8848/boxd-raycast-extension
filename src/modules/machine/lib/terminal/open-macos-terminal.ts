import { runAppleScript } from "@raycast/utils";
import type { Machine } from "@boxd-sh/sdk";
import {
  BOXD_COMMAND,
  MACOS_TERMINAL_APPLICATION,
} from "@/modules/machine/lib/terminal/constants";

const OPEN_TERMINAL_SCRIPT = `
on run argv
  set cliPath to item 1 of argv
  set machineId to item 2 of argv
  set machineRegion to item 3 of argv
  set commandLine to quoted form of cliPath & " machine connect"
  if machineRegion is not "" then
    set commandLine to commandLine & " --region " & quoted form of machineRegion
  end if
  set commandLine to commandLine & " " & quoted form of machineId
  tell application "${MACOS_TERMINAL_APPLICATION}"
    activate
    do script commandLine
  end tell
end run
`;

export async function openMacosTerminal(machine: Machine): Promise<void> {
  await runAppleScript(OPEN_TERMINAL_SCRIPT, [
    BOXD_COMMAND,
    machine.id,
    machine.region ?? "",
  ]);
}
