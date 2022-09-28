import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const configStore = configureStore({ reducer: rootReducer });
export default configStore;
