import { pIndex, pShow } from "./places";
import { tIndex, tNew, tShow, tEdit, tUpdate, tPost } from "./trips";
import { prNew, prShow, prCreate } from "./passenger_requests";
import { uRegister, uSession } from "./users";

export const routes = {
  places: { index: pIndex, show: pShow },
  trips: { index: tIndex, show: tShow, new: tNew, edit: tEdit, update:tUpdate, post:tPost},
  passenger_requests: { new: prNew, show: prShow, create: prCreate },
  users: {registration:uRegister, session: uSession}
};
