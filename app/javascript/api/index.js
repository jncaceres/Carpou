import { pIndex, pShow } from "./places";
import { tIndex, tShow } from "./trips";
import { prNew } from "./passenger_requests";

export const routes = {
  places: { index: pIndex, show: pShow },
  trips: { index: tIndex, show: tShow },
  passenger_requests: { new: prNew },
};
