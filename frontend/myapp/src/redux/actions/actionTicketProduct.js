export const startSetProductInTicket = (data) => {
  return {
    type: "START-SET-PRODUCT-IN-TICKET",
    payload: data,
  };
};

export const resetProductInTicket = () => {
  return {
    type: "RESET-PRODUCT-IN-TICKET",
  };
};

export const addProductInTicket = (data) => {
  return {
    type: "ADD-PRODUCT-IN-TICKET",
    payload: data,
  };
};

export const removeProductInTicket = (id) => {
  return {
    type: "REMOVE-PRODUCT-IN-TICKET",
    payload: id,
  };
};

export const updateProductQuantityInTicket = (id, quantity) => {
  return {
    type: "UPDATE-PRODUCT-QUANTITY-IN-TICKET",
    payload: { id, quantity },
  };
};
