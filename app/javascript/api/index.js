import { landpage } from "./root";
import { pIndex, pShow } from "./places";
import { tIndex, tNew, tShow, tEdit, tUpdate, tPost, tFromUser, tDelete } from "./trips";
import { prNew, prShow, prCreate, prDelete, prFromUser } from "./passenger_requests";
import { uRegister, uSession, uSignOut, uRegisterPost } from "./users";

export const routes = {
  root:  {root: landpage},
  places: { index: pIndex, show: pShow },
  trips: { index: tIndex, show: tShow, new: tNew, edit: tEdit, update:tUpdate, post:tPost, fromUser: tFromUser, delete: tDelete},
  passenger_requests: { new: prNew, show: prShow, create: prCreate, delete: prDelete, fromUser: prFromUser},
  users: {registration:uRegister, session: uSession, signOut: uSignOut, post :uRegisterPost }
};
