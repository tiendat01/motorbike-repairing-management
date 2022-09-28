const initialState =
  JSON.parse(window.localStorage.getItem("ticketService")) || [];
const reducerTicketService = (state = initialState, action) => {
  switch (action.type) {
    case "START-SET-SERVICE-IN-TICKET":
      window.localStorage.setItem(
        "ticketService",
        JSON.stringify([...action.payload])
      );
      return [...action.payload];
    case "RESET-SERVICE-IN-TICKET":
      window.localStorage.setItem("ticketService", JSON.stringify([]));
      return [];
    case "ADD-SERVICE-IN-TICKET":
      window.localStorage.setItem(
        "ticketService",
        JSON.stringify([...state, action.payload])
      );
      return [...state, action.payload];
    case "REMOVE-SERVICE-IN-TICKET":
      const newState = state.filter((item) => item.id !== action.payload);
      window.localStorage.setItem("ticketService", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export default reducerTicketService;
