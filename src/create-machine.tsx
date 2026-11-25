import { Action, Form, popToRoot, showToast, Toast } from "@raycast/api";
import { useForm } from "@raycast/utils";
import { boxdClient } from "@/lib/boxd";
import {
  toMachineCreateParams,
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
      const toast = await showToast({
        style: Toast.Style.Animated,
        title: "Creating machine…",
      });

      try {
        const machine = await boxdClient.createMachine(
          toMachineCreateParams(
            {
              name: values.name,
              region: values.region,
              size: values.size,
              isolated: values.isolated,
            },
            placementContext,
          ),
        );

        await toast.hide();
        await showToast({
          style: Toast.Style.Success,
          title: "Machine created",
          message: machine.name,
        });
        await popToRoot();
      } catch (error) {
        await toast.hide();
        const message =
          error instanceof Error ? error.message : "Request failed";
        await showToast({
          style: Toast.Style.Failure,
          title: "Could not create machine",
          message,
        });
        throw new Error(message);
      }
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
          retryTitle="Reload Regions"
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
        loadErrorTitle="Could not load regions"
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
