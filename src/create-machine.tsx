import {
  Action,
  Form,
  LaunchType,
  launchCommand,
  useNavigation,
} from "@raycast/api";
import { useForm } from "@raycast/utils";
import { createMachineWithFeedback } from "@/modules/machine/actions";
import {
  CREATE_MACHINE_REGIONS_LOAD_ERROR_TITLE,
  CREATE_MACHINE_RELOAD_REGIONS_TITLE,
  CREATE_MACHINE_SUBMIT_ACTION_TITLE,
  DEFAULT_MACHINE_OS,
  DEFAULT_REGION_FORM_VALUE,
  DEFAULT_SPEC_FORM_VALUE,
  IsolatedFormField,
  MachineNameFormField,
  MachineOsFormField,
  MachineRegionFormField,
  SpecSizeFormField,
  type CreateMachineFormInput,
  useMachineCreateRegionPlacement,
} from "@/modules/machine";
import {
  FormAsyncLoadActions,
  FormAsyncLoadDescriptions,
  isAsyncLoadReady,
} from "@/modules/shared";
import { boxdClient } from "./lib/boxd";

type CreateMachineCommandProps = Readonly<{
  handleMachineCreate?: () => void;
}>;

export default function Command({
  handleMachineCreate,
}: CreateMachineCommandProps) {
  const { pop } = useNavigation();

  const handleMachineCreateSuccess = async (): Promise<void> => {
    if (handleMachineCreate) {
      pop();
      handleMachineCreate();
      return;
    }
    // Close the client to avoid holding the channel open for the new command window.
    await boxdClient.close();
    await launchCommand({
      name: "list-machines",
      type: LaunchType.UserInitiated,
    });
  };
  const {
    sortedRegions,
    placementContext,
    isMachineCreateRegionPlacementLoading,
    machineCreateRegionPlacementError,
    reloadMachineCreateRegionPlacement,
  } = useMachineCreateRegionPlacement();

  const { handleSubmit, itemProps } = useForm<CreateMachineFormInput>({
    async onSubmit(values) {
      await createMachineWithFeedback({
        values,
        placementContext,
      });
      await handleMachineCreateSuccess();
    },
    initialValues: {
      name: undefined,
      region: DEFAULT_REGION_FORM_VALUE,
      size: DEFAULT_SPEC_FORM_VALUE,
      os: DEFAULT_MACHINE_OS,
      isolated: false,
    },
  });

  const regionsCatalogLoad = {
    error: machineCreateRegionPlacementError,
    loading: isMachineCreateRegionPlacementLoading,
    isEmpty: false,
  };
  const regionsCatalogReady = isAsyncLoadReady(regionsCatalogLoad);

  return (
    <Form
      isLoading={isMachineCreateRegionPlacementLoading}
      actions={
        <FormAsyncLoadActions
          error={machineCreateRegionPlacementError}
          onRetry={reloadMachineCreateRegionPlacement}
          retryTitle={CREATE_MACHINE_RELOAD_REGIONS_TITLE}
          submit={
            regionsCatalogReady ? (
              <Action.SubmitForm
                title={CREATE_MACHINE_SUBMIT_ACTION_TITLE}
                onSubmit={handleSubmit}
              />
            ) : null
          }
        />
      }
    >
      <FormAsyncLoadDescriptions
        {...regionsCatalogLoad}
        loadErrorTitle={CREATE_MACHINE_REGIONS_LOAD_ERROR_TITLE}
        showNoRegionsEmpty={false}
      />

      {regionsCatalogReady ? (
        <>
          <MachineNameFormField {...itemProps.name} />
          <MachineRegionFormField
            regions={sortedRegions}
            {...itemProps.region}
          />
          <MachineOsFormField {...itemProps.os} />
          <SpecSizeFormField {...itemProps.size} />
          <IsolatedFormField {...itemProps.isolated} />
        </>
      ) : null}
    </Form>
  );
}
