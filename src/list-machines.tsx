import {
  Action,
  ActionPanel,
  Color,
  Icon,
  List,
  openExtensionPreferences,
} from "@raycast/api";
import type { Machine, MachineStatus } from "@boxd-sh/sdk";
import { regionListParam, useRegionScopedPromise } from "@/modules/region";
import { boxdClient } from "@/lib/boxd";

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

function machineAccessories(machine: Machine): List.Item.Accessory[] {
  const accessories: List.Item.Accessory[] = [
    {
      tag: {
        value: formatStatus(machine.status),
        color: statusTint(machine.status),
      },
    },
  ];
  if (machine.region) {
    accessories.push({ text: machine.region });
  }
  return accessories;
}

export default function Command() {
  const {
    searchBarAccessory,
    isLoading,
    data: machines,
    error,
    revalidate,
  } = useRegionScopedPromise(async (selectedRegion) => {
    const list = await boxdClient.listMachines(regionListParam(selectedRegion));
    return list.toSorted((a, b) => a.name.localeCompare(b.name));
  });

  const missingKey = error?.message === "missing-api-key";

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search machines…"
      searchBarAccessory={searchBarAccessory}
    >
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
            accessories={machineAccessories(machine)}
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
