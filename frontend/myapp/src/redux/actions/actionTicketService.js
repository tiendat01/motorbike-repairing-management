export const startSetServiceInTicket = (data) => {
  return {
    type: "START-SET-SERVICE-IN-TICKET",
    payload: data,
  };
};

export const resetServiceInTicket = () => {
  return {
    type: "RESET-SERVICE-IN-TICKET",
  };
};

export const addServiceInTicket = (data) => {
  return {
    type: "ADD-SERVICE-IN-TICKET",
    payload: data,
  };
};

export const removeServiceInTicket = (id) => {
  return {
    type: "REMOVE-SERVICE-IN-TICKET",
    payload: id,
  };
};
