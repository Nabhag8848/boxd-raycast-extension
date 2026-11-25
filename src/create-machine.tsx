import { Action, Form } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { createMachineWithFeedback } from "@/modules/machine/actions";
import {
  CREATE_MACHINE_REGIONS_LOAD_ERROR_TITLE,
  CREATE_MACHINE_RELOAD_REGIONS_TITLE,
  DEFAULT_REGION_FORM_VALUE,
  DEFAULT_SPEC_FORM_VALUE,
  IsolatedFormField,
  MachineNameFormField,
  MachineRegionFormField,
  SpecSizeFormField,
  type CreateMachineFormInput,
  useRegionPlacement,
} from "@/modules/machine";
import {
  FormLoadErrorActions,
  FormLoadErrorDescriptions,
  isFormAsyncLoadReady,
} from "@/modules/shared";

export default function Command() {
  const {
    sortedRegions,
    placementContext,
    isRegionPlacementLoading,
    regionPlacementError,
    reloadRegionPlacement,
  } = useRegionPlacement();

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
    error: regionPlacementError,
    loading: isRegionPlacementLoading,
    isEmpty: false,
  };
  const regionsCatalogReady = isFormAsyncLoadReady(regionsCatalogLoad);

  return (
    <Form
      isLoading={isRegionPlacementLoading}
      actions={
        <FormLoadErrorActions
          error={regionPlacementError}
          onRetry={reloadRegionPlacement}
          retryTitle={CREATE_MACHINE_RELOAD_REGIONS_TITLE}
          submit={
            regionsCatalogReady ? (
              <Action.SubmitForm
                title="Create Machine"
                onSubmit={handleSubmit}
              />
            ) : null
          }
        />
      }
    >
      <FormLoadErrorDescriptions
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
