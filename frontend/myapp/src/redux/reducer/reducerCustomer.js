const reducerCustomer = (state = [], action) => {
  switch (action.type) {
    case "START-SET-CUSTOMER":
      return [...action.payload];
    case "ADD-CUSTOMER":
      return [...state, action.payload];
    case "REMOVE-CUSTOMER":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE-CUSTOMER":
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

export default reducerCustomer;
