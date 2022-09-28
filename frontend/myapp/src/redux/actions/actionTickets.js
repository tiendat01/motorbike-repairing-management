export const startSetTickets = (data) => {
  return {
    type: "START-SET-TICKETS",
    payload: data,
  };
};

export const addTickets = (data) => {
  return {
    type: "ADD-TICKETS",
    payload: data,
  };
};

export const removeTickets = (id) => {
  return {
    type: "REMOVE-TICKETS",
    payload: id,
  };
};

export const updateTickets = (id, data) => {
  return {
    type: "UPDATE-TICKETS",
    payload: { id, data },
  };
};
