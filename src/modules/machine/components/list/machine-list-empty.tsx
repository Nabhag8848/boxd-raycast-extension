import { Action, ActionPanel, Icon, List } from "@raycast/api";
import CreateMachine from "@/create-machine";
import {
  MACHINE_LIST_CREATE_ACTION_TITLE,
  MACHINE_LIST_EMPTY_ALL_REGIONS_DESCRIPTION,
  MACHINE_LIST_EMPTY_REGION_DESCRIPTION,
  MACHINE_LIST_EMPTY_TITLE,
} from "@/modules/machine/lib/list/constants";
import { ALL_REGIONS, type SelectedRegion } from "@/modules/region/types";
import type { ReactElement } from "react";

type MachineListEmptyViewProps = Readonly<{
  region: SelectedRegion;
  handleMachineCreate: () => void;
}>;

export function MachineListEmptyView({
  region,
  handleMachineCreate,
}: MachineListEmptyViewProps): ReactElement {
  const showingAllRegions = region === ALL_REGIONS;

  return (
    <List.EmptyView
      title={MACHINE_LIST_EMPTY_TITLE}
      description={
        showingAllRegions
          ? MACHINE_LIST_EMPTY_ALL_REGIONS_DESCRIPTION
          : MACHINE_LIST_EMPTY_REGION_DESCRIPTION
      }
      icon={Icon.HardDrive}
      actions={
        <ActionPanel>
          <Action.Push
            title={MACHINE_LIST_CREATE_ACTION_TITLE}
            icon={Icon.Plus}
            target={<CreateMachine handleMachineCreate={handleMachineCreate} />}
          />
        </ActionPanel>
      }
    />
  );
}
