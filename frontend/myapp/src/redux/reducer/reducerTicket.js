const initialState = {
  description: "",
  note: "",
  status: 0,
  appointmentDate: "",
  discount: 0,
  motorbikeId: null,
  repairingEmployeeId: null,
  customerId: null,
  productRequestSet: [],
  serviceRequestSet: [],
};

const reducerTicket = (state = initialState, action) => {
  switch (action.type) {
    case "RESET-TICKET": {
      window.localStorage.removeItem("ticketProduct");
      window.localStorage.removeItem("ticketService");
      return initialState;
    }
    case "ADD-TICKET-APPOINTMENT-DATE":
      return { ...state, appointmentDate: action.payload };
    case "ADD-TICKET-EMPLOYEE":
      return { ...state, repairingEmployeeId: action.payload };
    case "ADD-TICKET-MOTORBIKE":
      return { ...state, motorbikeId: action.payload };
    case "ADD-TICKET-CUSTOMER":
      return { ...state, customerId: action.payload };
    case "ADD-TICKET-PRODUCT":
      return { ...state, productRequestSet: action.payload };
    case "ADD-TICKET-SERVICE":
      return { ...state, serviceRequestSet: action.payload };
    default:
      return state;
  }
};

export default reducerTicket;
