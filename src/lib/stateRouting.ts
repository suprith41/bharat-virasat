import { STATES, type StateData } from "@/data/states";

export function normalizeStateName(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]/g, "");
}

const stateByName = new Map(
  Object.values(STATES).map((state) => [normalizeStateName(state.name), state] as const),
);

const stateById = new Map(Object.values(STATES).map((state) => [state.id.toLowerCase(), state] as const));

export function resolveStateFromParam(param: string): StateData | undefined {
  const decoded = decodeURIComponent(param);
  const normalized = normalizeStateName(decoded);
  return stateById.get(normalized) ?? stateByName.get(normalized);
}
