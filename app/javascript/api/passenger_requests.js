export const prNew = ({trip_id}) => {
  return `/passenger_requests/new?trip_id=${trip_id}`;
};

export const prCreate = () => {
  return `/passenger_requests/`;
};

export const prShow = (id) => {
  return `/passenger_requests/${id}`;
};

export const prDelete = (id) => {
  return `/passenger_requests/${id}`;
};
