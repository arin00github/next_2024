import { configureStore } from "@reduxjs/toolkit";
import resourceReducer from "./stores/resource";
import { resourceApi } from "./api/resourceApi";
import { dbqueryApi } from "./api/dbqueryApi";

export const store = configureStore({
  reducer: {
    resource: resourceReducer,
    [resourceApi.reducerPath]: resourceApi.reducer,
    [dbqueryApi.reducerPath]: dbqueryApi.reducer,
  },
  middleware: (getdefualt) => {
    return getdefualt().concat(resourceApi.middleware, dbqueryApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
