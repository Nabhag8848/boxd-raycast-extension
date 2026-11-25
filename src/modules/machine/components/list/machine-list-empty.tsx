import { Icon, List } from "@raycast/api";
import {
  MACHINE_LIST_EMPTY_DESCRIPTION,
  MACHINE_LIST_EMPTY_TITLE,
} from "@/modules/machine/lib/list/query";
import type { ReactElement } from "react";

export function MachineListEmptyView(): ReactElement {
  return (
    <List.EmptyView
      title={MACHINE_LIST_EMPTY_TITLE}
      description={MACHINE_LIST_EMPTY_DESCRIPTION}
      icon={Icon.HardDrive}
    />
  );
}
