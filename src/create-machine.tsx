import { Action, Form } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { createMachineWithFeedback } from "@/modules/machine/actions";
import {
  CREATE_MACHINE_REGIONS_LOAD_ERROR_TITLE,
  CREATE_MACHINE_RELOAD_REGIONS_TITLE,
  CREATE_MACHINE_SUBMIT_ACTION_TITLE,
  DEFAULT_REGION_FORM_VALUE,
  DEFAULT_SPEC_FORM_VALUE,
  IsolatedFormField,
  MachineNameFormField,
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

export default function Command() {
  const {
    sortedRegions,
    placementContext,
    isMachineCreateRegionPlacementLoading,
    machineCreateRegionPlacementError,
    reloadMachineCreateRegionPlacement,
  } = useMachineCreateRegionPlacement();

  const { handleSubmit, itemProps } = useForm<CreateMachineFormInput>({
    async onSubmit(values) {
      await createMachineWithFeedback(values, placementContext);
    },
    initialValues: {
      name: undefined,
      region: DEFAULT_REGION_FORM_VALUE,
      size: DEFAULT_SPEC_FORM_VALUE,
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
          <SpecSizeFormField {...itemProps.size} />
          <IsolatedFormField {...itemProps.isolated} />
        </>
      ) : null}
    </Form>
  );
}
