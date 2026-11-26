import { FormDescriptionField } from "@/modules/shared/ui/fields";
import {
  NO_REGIONS_DESCRIPTION,
  NO_REGIONS_TITLE,
} from "@/modules/shared/errors/constants";

export function NoRegionsFormDescription() {
  return (
    <FormDescriptionField
      title={NO_REGIONS_TITLE}
      text={NO_REGIONS_DESCRIPTION}
    />
  );
}
