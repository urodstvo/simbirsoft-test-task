import type { Competitions } from "@/types/League";
import type { Matches } from "@/types/Match";
import type { Team, Teams } from "@/types/Team";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
    reducerPath: "Api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set("X-Auth-Token", import.meta.env.VITE_API_TOKEN);
            headers.set("X-Unfold-Goals", String(true));
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllCompetitions: builder.query<Competitions, void>({
            query: () => `/competitions`
        }),
        getAllTeams: builder.query<Teams, void>({
            query: () => `/teams`
        }),
        getMatchesByLeagueId: builder.query<Matches, { id: string | number; from: string; to: string }>({
            query: ({ id, from, to }) => `/competitions/${id}/matches?dateFrom=${from}&dateTo=${to}`
        }),
        getMatchesByTeamId: builder.query<Matches, { id: string | number; from: string; to: string }>({
            query: ({ id, from, to }) => `/teams/${id}/matches?dateFrom=${from}&dateTo=${to}`
        }),
        getTeamById: builder.query<Team, string | number>({
            query: (id) => `/teams/${id}`
        }),
        getLeagueById: builder.query<Team, string | number>({
            query: (id) => `/competitions/${id}`
        })
    })
});

export const {
    useGetAllCompetitionsQuery,
    useGetAllTeamsQuery,
    useGetMatchesByLeagueIdQuery,
    useGetMatchesByTeamIdQuery,
    useGetTeamByIdQuery,
    useGetLeagueByIdQuery
} = Api;
