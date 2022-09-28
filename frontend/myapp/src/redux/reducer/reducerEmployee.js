const reducerEmployee = (state = [], action) => {
  switch (action.type) {
    case "START-SET-EMPLOYEE":
      return [...action.payload];
    case "ADD-EMPLOYEE":
      return [...state, action.payload];
    case "REMOVE-EMPLOYEE":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE-EMPLOYEE":
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

export default reducerEmployee;
