import type { Competition } from "@/types/League";
import { createSlice } from "@reduxjs/toolkit";

type stateType = {
    selectedLeague: Competition | null;
};

const initialState: stateType = {
    selectedLeague: null
};

export const LeagueSlice = createSlice({
    name: "league",
    initialState,
    reducers: {
        setLeague: (state, action) => {
            state.selectedLeague = action.payload;
        }
    }
});

export const { setLeague } = LeagueSlice.actions;
