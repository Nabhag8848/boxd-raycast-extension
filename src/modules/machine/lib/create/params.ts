import {
  Machine,
  type MachineCreateParams,
  type MachineSpec,
} from "@boxd-sh/sdk";
import {
  type RegionFormValue,
  type RegionPlacementContext,
  toMachineCreateRegion,
} from "@/modules/machine/lib/create/regions";
import {
  isOrgDefaultMachineSize,
  type SpecFormValue,
} from "@/modules/machine/lib/create/sizes";

export type CreateMachineFormInput = Readonly<{
  name?: string;
  /** Always set in the form ({@link DEFAULT_REGION_FORM_VALUE} by default). */
  region: RegionFormValue;
  size: SpecFormValue;
  isolated: boolean;
}>;

function toMachineSpec(size: SpecFormValue, isolated: boolean): MachineSpec {
  if (isOrgDefaultMachineSize(size)) {
    if (isolated) {
      return Machine.spec().isolated().resolve();
    }
    return Machine.spec().resolve();
  }

  if (isolated) {
    return Machine.spec().size(size).isolated().resolve();
  }

  return Machine.spec().size(size).resolve();
}

/** Form values → `machines.create` params (cluster default image). */
export function toMachineCreateParams(
  input: CreateMachineFormInput,
  placement: RegionPlacementContext,
): MachineCreateParams {
  const region = toMachineCreateRegion(input.region, placement);
  const name = input.name?.trim();
  const spec = toMachineSpec(input.size, input.isolated);

  if (name) {
    return {
      name,
      region,
      spec,
    };
  }

  return {
    region,
    spec,
  };
}
