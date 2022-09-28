export const resetTicket = () => {
  return {
    type: "RESET-TICKET",
  };
};

export const addTicketEmployee = (data) => {
  return {
    type: "ADD-TICKET-EMPLOYEE",
    payload: data,
  };
};

export const addTicketAppointmentDate = (data) => {
  return {
    type: "ADD-TICKET-APPOINTMENT-DATE",
    payload: data,
  };
};

export const addTicketMotorbike = (data) => {
  return {
    type: "ADD-TICKET-MOTORBIKE",
    payload: data,
  };
};

export const addTicketCustomer = (data) => {
  return {
    type: "ADD-TICKET-CUSTOMER",
    payload: data,
  };
};

export const addTicketProduct = (data) => {
  return {
    type: "ADD-TICKET-PRODUCT",
    payload: data,
  };
};

export const addTicketService = (data) => {
  return {
    type: "ADD-TICKET-SERVICE",
    payload: data,
  };
};
