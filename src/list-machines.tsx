import { List } from "@raycast/api";
import {
  MachineListEmptyView,
  MachineListItem,
  MACHINE_LIST_LOAD_ERROR_TITLE,
  MACHINE_LIST_SEARCH_PLACEHOLDER,
  useMachineList,
} from "@/modules/machine";
import { ListLoadErrorEmptyView } from "@/modules/shared";

export default function Command() {
  const {
    region,
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
        <ListLoadErrorEmptyView
          error={machineListError}
          loadErrorTitle={MACHINE_LIST_LOAD_ERROR_TITLE}
          onRetry={reloadMachineList}
        />
      ) : null}
      {!machineListError &&
        machines?.map((machine) => (
          <MachineListItem
            key={machine.id}
            machine={machine}
            handleMachineListRefresh={reloadMachineList}
            handleMachineDelete={reloadMachineList}
            handleMachineCreate={reloadMachineList}
          />
        ))}
      {!machineListError && !isMachineListLoading && machines?.length === 0 ? (
        <MachineListEmptyView
          region={region}
          handleMachineCreate={reloadMachineList}
        />
      ) : null}
    </List>
  );
}
