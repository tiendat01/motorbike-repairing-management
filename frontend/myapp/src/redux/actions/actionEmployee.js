export const startSetEmployee = (data) => {
  return {
    type: "START-SET-EMPLOYEE",
    payload: data,
  };
};

export const addEmployee = (data) => {
  return {
    type: "ADD-EMPLOYEE",
    payload: data,
  };
};

export const removeEmployee = (id) => {
  return {
    type: "REMOVE-EMPLOYEE",
    payload: id,
  };
};

export const updateEmployee = (id, data) => {
  return {
    type: "UPDATE-EMPLOYEE",
    payload: { id, data },
  };
};
