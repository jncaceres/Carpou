export const tIndex = (params) => {
  if (params) {
    return `/trips?from=${params.from}&to=${params.to}&date=${params.date}`;
  } else {
    return `/trips`;
  }
};

export const tShow = (id) => {
  return `/trips/${id}`;
};
export const tNew = () => {
  return `/trips/new`;
};

export const tEdit = (id) => {
  return `/trips/${id}/edit`;
};

export const tUpdate = (id) => {
  return `/trips/${id}`;
};
export const tPost = () => {
  return `/trips`;
};

export const tFromUser = (id) => {
  return `/users/${id}/trips`
};