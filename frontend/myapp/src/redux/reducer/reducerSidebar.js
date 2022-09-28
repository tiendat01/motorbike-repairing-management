import * as actionTypes from "../actions/actionSidebar";

export const initialState = {
  isOpen: [], // for active default menu
  opened: true,
  openedFilter: false,
};

const reducerSidebar = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case actionTypes.SET_FILTER_DRAWER:
      return {
        ...state,
        openedFilter: action.openedFilter,
      };
    default:
      return state;
  }
};

export default reducerSidebar;
