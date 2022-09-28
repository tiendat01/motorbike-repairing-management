export const startSetProduct = (data) => {
  return {
    type: "START-SET-PRODUCT",
    payload: data,
  };
};

export const addProduct = (data) => {
  return {
    type: "ADD-PRODUCT",
    payload: data,
  };
};

export const removeProduct = (id) => {
  return {
    type: "REMOVE-PRODUCT",
    payload: id,
  };
};

export const updateProduct = (id, data) => {
  return {
    type: "UPDATE-PRODUCT",
    payload: { id, data },
  };
};
