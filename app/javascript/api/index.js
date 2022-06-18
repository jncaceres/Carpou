import { landpage } from "./root";
import { pIndex, pShow } from "./places";
import { tIndex, tNew, tShow, tEdit, tUpdate, tPost, tFromUser } from "./trips";
import { prNew, prShow, prCreate, prFromUser } from "./passenger_requests";
import { uRegister, uSession, uSignOut } from "./users";

export const routes = {
  root:  {root: landpage},
  places: { index: pIndex, show: pShow },
  trips: { index: tIndex, show: tShow, new: tNew, edit: tEdit, update:tUpdate, post:tPost, fromUser: tFromUser},
  passenger_requests: { new: prNew, show: prShow, create: prCreate , fromUser: prFromUser},
  users: {registration:uRegister, session: uSession, signOut: uSignOut}
};
