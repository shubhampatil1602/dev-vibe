import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import feedSlice from "./slices/feedSlice";
import connectionsSlice from "./slices/connectionsSlice";
import requestsSlice from "./slices/requestsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    connections: connectionsSlice,
    requests: requestsSlice,
  },
});

export default store;
