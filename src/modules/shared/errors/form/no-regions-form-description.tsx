import { FormDescriptionField } from "@/modules/shared/ui/fields";

export function NoRegionsFormDescription() {
  return (
    <FormDescriptionField
      title="No regions"
      text="No regions available. Enable one in the boxd console, then reload."
    />
  );
}