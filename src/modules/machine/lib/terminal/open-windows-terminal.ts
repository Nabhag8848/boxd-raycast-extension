import { runPowerShellScript } from "@raycast/utils";
import type { Machine } from "@boxd-sh/sdk";
import {
  WINDOWS_POWERSHELL_EXECUTABLE,
  WINDOWS_TERMINAL_EXECUTABLE,
} from "@/modules/machine/lib/terminal/constants";
import {
  boxdConnectArguments,
  powerShellQuote,
} from "@/modules/machine/lib/terminal/command";

const WINDOWS_TERMINAL_NEW_TAB_ARGUMENT = "new-tab";
const WINDOWS_TERMINAL_COMMAND_SEPARATOR = "--";
const POWERSHELL_NO_EXIT_ARGUMENT = "-NoExit";
const POWERSHELL_ENCODED_COMMAND_ARGUMENT = "-EncodedCommand";

export async function openWindowsTerminal(machine: Machine): Promise<void> {
  const connectArguments = boxdConnectArguments(machine);
  const encodedCommand = Buffer.from(
    `& ${connectArguments.map(powerShellQuote).join(" ")}`,
    "utf16le",
  ).toString("base64");
  const windowsTerminalArguments = [
    WINDOWS_TERMINAL_NEW_TAB_ARGUMENT,
    WINDOWS_TERMINAL_COMMAND_SEPARATOR,
    ...connectArguments,
  ];

  await runPowerShellScript(`
if (Get-Command ${WINDOWS_TERMINAL_EXECUTABLE} -ErrorAction SilentlyContinue) {
  Start-Process -FilePath ${powerShellQuote(WINDOWS_TERMINAL_EXECUTABLE)} -ArgumentList @(${windowsTerminalArguments.map(powerShellQuote).join(", ")})
} else {
  Start-Process -FilePath ${powerShellQuote(WINDOWS_POWERSHELL_EXECUTABLE)} -ArgumentList @('${POWERSHELL_NO_EXIT_ARGUMENT}', '${POWERSHELL_ENCODED_COMMAND_ARGUMENT}', '${encodedCommand}')
}
`);
}
