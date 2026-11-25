import { FormDescriptionField } from "@/modules/shared/ui/fields";
import {
  API_KEY_REQUIRED_DESCRIPTION,
  API_KEY_REQUIRED_TITLE,
} from "@/modules/shared/errors/api-key";

export function ApiKeyRequiredFormDescription() {
  return (
    <FormDescriptionField
      title={API_KEY_REQUIRED_TITLE}
      text={API_KEY_REQUIRED_DESCRIPTION}
    />
  );
}
