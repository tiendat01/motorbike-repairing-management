export const startSetCustomer = (data) => {
  return {
    type: "START-SET-CUSTOMER",
    payload: data,
  };
};

export const addCustomer = (data) => {
  return {
    type: "ADD-CUSTOMER",
    payload: data,
  };
};

export const removeCustomer = (id) => {
  return {
    type: "REMOVE-CUSTOMER",
    payload: id,
  };
};

export const updateCustomer = (id, data) => {
  return {
    type: "UPDATE-CUSTOMER",
    payload: { id, data },
  };
};
