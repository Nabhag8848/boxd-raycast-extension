import {
  Action,
  ActionPanel,
  Color,
  Icon,
  List,
  openExtensionPreferences,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import type { MachineStatus } from "@boxd-sh/sdk";
import { boxdClient } from "./lib/boxd";

function statusTint(status: MachineStatus): Color {
  switch (status) {
    case "running":
      return Color.Green;
    case "starting":
    case "pending":
    case "migrating":
      return Color.Blue;
    case "failed":
      return Color.Red;
    case "destroyed":
      return Color.SecondaryText;
    default:
      return Color.Yellow;
  }
}

function formatStatus(status: MachineStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function Command() {
  const {
    isLoading,
    data: machines,
    error,
    revalidate,
  } = usePromise(async () => {
    const list = await boxdClient.listMachines();
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const missingKey = error?.message === "missing-api-key";

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search machines…">
      {error && (
        <List.EmptyView
          title={missingKey ? "API key required" : "Could not load machines"}
          description={
            missingKey
              ? "Add your boxd API key in extension preferences."
              : error.message
          }
          actions={
            <ActionPanel>
              {missingKey ? (
                <Action
                  title="Open Preferences"
                  icon={Icon.Gear}
                  onAction={openExtensionPreferences}
                />
              ) : (
                <Action
                  title="Try Again"
                  icon={Icon.ArrowClockwise}
                  onAction={() => revalidate()}
                />
              )}
            </ActionPanel>
          }
        />
      )}
      {!error &&
        machines?.map((machine) => (
          <List.Item
            key={machine.id}
            title={machine.name}
            subtitle={machine.access.url || undefined}
            keywords={[
              machine.status,
              machine.region ?? "",
              machine.org?.name ?? "",
            ]}
            icon={{
              source: Icon.HardDrive,
              tintColor: statusTint(machine.status),
            }}
            accessories={[
              {
                tag: {
                  value: formatStatus(machine.status),
                  color: statusTint(machine.status),
                },
              },
              ...(machine.region ? [{ text: machine.region }] : []),
            ]}
            actions={
              <ActionPanel>
                {machine.access.url ? (
                  <Action.OpenInBrowser
                    title="Open in Browser"
                    url={machine.access.url}
                  />
                ) : null}
                {machine.access.url ? (
                  <Action.CopyToClipboard
                    title="Copy URL"
                    content={machine.access.url}
                  />
                ) : null}
                <Action.CopyToClipboard
                  title="Copy Name"
                  content={machine.name}
                />
                <Action
                  title="Refresh"
                  icon={Icon.ArrowClockwise}
                  onAction={() => revalidate()}
                />
              </ActionPanel>
            }
          />
        ))}
      {!error && !isLoading && machines?.length === 0 && (
        <List.EmptyView
          title="No machines"
          description="Create one with `boxd machine new` or in the boxd console."
          icon={Icon.HardDrive}
        />
      )}
    </List>
  );
}
