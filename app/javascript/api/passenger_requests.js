export const prNew = (id) => {
  return `/passenger_requests/new?trip_id=${id}`;
};

export const prCreate = () => {
  return `/passenger_requests/`;
};

export const prShow = (id) => {
  return `/passenger_requests/${id}`;
};
