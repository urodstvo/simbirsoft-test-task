import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { Api } from "@/api";
import { LeagueSlice } from "@/store/slices/league";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import { TeamSlice } from "./slices/team";

const store = configureStore({
    reducer: {
        leagues: LeagueSlice.reducer,
        teams: TeamSlice.reducer,
        [Api.reducerPath]: Api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Api.middleware)
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
