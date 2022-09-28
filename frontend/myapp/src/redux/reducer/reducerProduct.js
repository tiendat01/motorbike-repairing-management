const reducerProduct = (state = [], action) => {
  switch (action.type) {
    case "START-SET-PRODUCT":
      return [...action.payload];
    case "ADD-PRODUCT":
      return [...state, action.payload];
    case "REMOVE-PRODUCT":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE-PRODUCT":
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

export default reducerProduct;
