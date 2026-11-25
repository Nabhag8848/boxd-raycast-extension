import { ActionPanel, Icon, List } from "@raycast/api";
import {
  MachineListActions,
  machineListAccessories,
  machineStatusTint,
} from "@/modules/machine";
import { useRegionScopedPromise } from "@/modules/region";
import {
  API_KEY_REQUIRED_DESCRIPTION,
  API_KEY_REQUIRED_TITLE,
  isMissingApiKeyError,
  OpenPreferencesAction,
  TryAgainAction,
} from "@/modules/shared";
import { boxdClient } from "@/lib/boxd";

export default function Command() {
  const {
    searchBarAccessory,
    isRegionScopedLoading,
    regionScopedData: machines,
    regionScopedError,
    reloadRegionScopedData,
  } = useRegionScopedPromise(async (selectedRegion) => {
    const list = await boxdClient.listMachines({ region: selectedRegion });
    return list.toSorted((a, b) => a.name.localeCompare(b.name));
  });

  const missingKey = isMissingApiKeyError(regionScopedError);

  return (
    <List
      isLoading={isRegionScopedLoading}
      searchBarPlaceholder="Search machines…"
      searchBarAccessory={searchBarAccessory}
    >
      {regionScopedError && (
        <List.EmptyView
          title={
            missingKey ? API_KEY_REQUIRED_TITLE : "Could not load machines"
          }
          description={
            missingKey
              ? API_KEY_REQUIRED_DESCRIPTION
              : regionScopedError.message
          }
          actions={
            <ActionPanel>
              {missingKey ? (
                <OpenPreferencesAction />
              ) : (
                <TryAgainAction onAction={() => reloadRegionScopedData()} />
              )}
            </ActionPanel>
          }
        />
      )}
      {!regionScopedError &&
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
              tintColor: machineStatusTint(machine.status),
            }}
            accessories={machineListAccessories(machine)}
            actions={
              <MachineListActions
                machine={machine}
                onRefresh={reloadRegionScopedData}
                onDeleted={reloadRegionScopedData}
              />
            }
          />
        ))}
      {!regionScopedError &&
        !isRegionScopedLoading &&
        machines?.length === 0 && (
          <List.EmptyView
            title="No machines"
            description="Create one with `boxd machine new` or in the boxd console."
            icon={Icon.HardDrive}
          />
        )}
    </List>
  );
}
