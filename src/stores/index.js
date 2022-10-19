//this will manage the stores

import { configureStore } from "@reduxjs/toolkit";
import todo from "./todo";
import auth from "./auth";
import modal from "./modalstore";

const store = configureStore({
  reducer: {
    todo,
    auth,
    modal,
  },
});

export default store;
