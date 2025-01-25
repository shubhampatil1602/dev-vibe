import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import feedSlice from "./slices/feedSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});

export default store;
