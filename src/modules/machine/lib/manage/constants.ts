export const START_MACHINE_STATUS_REFRESH_DELAY_MS = 2000;

export const DELETE_MACHINE_CONFIRMATION_MESSAGE =
  "This permanently destroys the machine and its disk.";
export const DELETE_MACHINE_CONFIRMATION_ACTION_TITLE = "Delete";
export const DELETE_MACHINE_PROGRESS_TITLE = "Deleting machine…";
export const DELETE_MACHINE_SUCCESS_TITLE = "Machine deleted";
export const DELETE_MACHINE_FAILURE_TITLE = "Could not delete machine";

export function deleteMachineConfirmationTitle(machineName: string): string {
  return `Delete “${machineName}”?`;
}
