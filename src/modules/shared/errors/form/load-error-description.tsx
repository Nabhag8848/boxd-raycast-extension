import { FormDescriptionField } from "@/modules/shared/ui/fields";
import type { FormLoadErrorDescriptionProps } from "@/modules/shared/errors/types";

export function FormLoadErrorDescription({
  title,
  error,
}: FormLoadErrorDescriptionProps) {
  return <FormDescriptionField title={title} text={error.message} />;
}
