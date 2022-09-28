const initialState =
  JSON.parse(window.localStorage.getItem("ticketProduct")) || [];
const reducerTicketProduct = (state = initialState, action) => {
  switch (action.type) {
    case "START-SET-PRODUCT-IN-TICKET":
      window.localStorage.setItem(
        "ticketProduct",
        JSON.stringify([...action.payload])
      );
      return [...action.payload];
    case "RESET-PRODUCT-IN-TICKET":
      window.localStorage.setItem("ticketProduct", JSON.stringify([]));
      return [];
    case "ADD-PRODUCT-IN-TICKET":
      const isProductExist = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (isProductExist !== -1) {
        action.payload.quantity += state[isProductExist].quantity;
        const productFirst = state.slice(0, isProductExist);
        const productSecond = state.slice(isProductExist + 1, state.length);
        window.localStorage.setItem(
          "ticketProduct",
          JSON.stringify([...productFirst, action.payload, ...productSecond])
        );
        return [...productFirst, action.payload, ...productSecond];
      } else {
        window.localStorage.setItem(
          "ticketProduct",
          JSON.stringify([...state, action.payload])
        );
        return [...state, action.payload];
      }
    case "REMOVE-PRODUCT-IN-TICKET":
      const newState = state.filter((item) => item.id !== action.payload);
      window.localStorage.setItem("ticketProduct", JSON.stringify(newState));
      return newState;
    case "UPDATE-PRODUCT-QUANTITY-IN-TICKET":
      const arr = JSON.parse(window.localStorage.getItem("ticketProduct"));
      const item = arr.find((item) => item.id === action.payload.id);
      const index = arr.findIndex((item) => item.id === action.payload.id);
      if (item) {
        const newItem = { ...item, quantity: action.payload.quantity };
        const productFirstPart = arr.slice(0, index);
        const productSecondPart = arr.slice(index + 1, arr.length);
        window.localStorage.setItem(
          "ticketProduct",
          JSON.stringify([...productFirstPart, newItem, ...productSecondPart])
        );
      }
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    default:
      return state;
  }
};

export default reducerTicketProduct;
