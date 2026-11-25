import {
  Machine,
  type MachineCreateParams,
  type MachineSpec,
} from "@boxd-sh/sdk";
import {
  type RegionFormValue,
  toMachineCreateRegion,
} from "@/modules/machine/lib/regions";
import {
  isOrgDefaultMachineSize,
  type SpecFormValue,
} from "@/modules/machine/lib/sizes";

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
): MachineCreateParams {
  const region = toMachineCreateRegion(input.region);
  const name = input.name?.trim();
  const spec = toMachineSpec(input.size, input.isolated);

  const placement = region ? { region } : {};

  if (name) {
    return {
      name,
      ...placement,
      spec,
    };
  }

  return {
    ...placement,
    spec,
  };
}
