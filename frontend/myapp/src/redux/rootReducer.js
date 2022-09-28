import { combineReducers } from "redux";
import reducerAuth from "./reducer/reducerAuth";
import reducerCustomer from "./reducer/reducerCustomer";
import reducerEmployee from "./reducer/reducerEmployee";
import reducerProduct from "./reducer/reducerProduct";
import reducerService from "./reducer/reducerService";
import reducerSidebar from "./reducer/reducerSidebar";
import reducerTicket from "./reducer/reducerTicket";
import reducerTicketProduct from "./reducer/reducerTicketProduct";
import reducerTickets from "./reducer/reducerTickets";
import reducerTicketService from "./reducer/reducerTicketService";

const rootReducer = combineReducers({
  sidebar: reducerSidebar,
  auth: reducerAuth,
  employee: reducerEmployee,
  customer: reducerCustomer,
  product: reducerProduct,
  service: reducerService,
  ticket: reducerTicket,
  tickets: reducerTickets,
  ticketProduct: reducerTicketProduct,
  ticketService: reducerTicketService,
});

export default rootReducer;
