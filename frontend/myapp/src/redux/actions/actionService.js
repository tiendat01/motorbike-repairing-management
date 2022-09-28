export const startSetService = (data) => {
  return {
    type: "START-SET-SERVICE",
    payload: data,
  };
};

export const addService = (data) => {
  return {
    type: "ADD-SERVICE",
    payload: data,
  };
};

export const removeService = (id) => {
  return {
    type: "REMOVE-SERVICE",
    payload: id,
  };
};

export const updateService = (id, data) => {
  return {
    type: "UPDATE-SERVICE",
    payload: { id, data },
  };
};
