import { List } from "@raycast/api";
import {
  MachineListEmptyView,
  MachineListItem,
  MachineListLoadErrorEmptyView,
  useMachineList,
  MACHINE_LIST_SEARCH_PLACEHOLDER,
} from "@/modules/machine";

export default function Command() {
  const {
    searchBarAccessory,
    machines,
    machineListError,
    isMachineListLoading,
    reloadMachineList,
  } = useMachineList();

  return (
    <List
      isLoading={isMachineListLoading}
      searchBarPlaceholder={MACHINE_LIST_SEARCH_PLACEHOLDER}
      searchBarAccessory={searchBarAccessory}
    >
      {machineListError ? (
        <MachineListLoadErrorEmptyView
          error={machineListError}
          onRetry={reloadMachineList}
        />
      ) : null}
      {!machineListError &&
        machines?.map((machine) => (
          <MachineListItem
            key={machine.id}
            machine={machine}
            onRefresh={reloadMachineList}
            onDeleted={reloadMachineList}
          />
        ))}
      {!machineListError && !isMachineListLoading && machines?.length === 0 ? (
        <MachineListEmptyView />
      ) : null}
    </List>
  );
}
