const reducerTickets = (state = [], action) => {
  switch (action.type) {
    case "START-SET-TICKETS":
      return [...action.payload];
    case "ADD-TICKETS":
      return [...state, action.payload];
    case "REMOVE-TICKETS":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE-TICKETS":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload.data;
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

export default reducerTickets;
