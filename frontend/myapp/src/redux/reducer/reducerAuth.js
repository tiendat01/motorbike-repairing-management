const initialState = {
  currentUser: JSON.parse(localStorage.getItem("user")),
};

const reducerAuth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default reducerAuth;
