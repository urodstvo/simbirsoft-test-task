import { Team } from "@/types/League";
import { createSlice } from "@reduxjs/toolkit";

type stateType = {
    selectedTeam: Team | null;
};

const initialState: stateType = {
    selectedTeam: null
};

export const TeamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setTeam: (state, action) => {
            state.selectedTeam = action.payload;
        }
    }
});

export const { setTeam } = TeamSlice.actions;
