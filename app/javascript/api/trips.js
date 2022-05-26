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