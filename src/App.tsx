import { useRoutes } from "react-router-dom";

import { Template } from "@/pages";
import { Leagues } from "@/pages/Leagues";
import { LeaguesCalendar } from "@/pages/LeaguesCalendar";
import { NotFound } from "@/pages/NotFound";
import { Teams } from "@/pages/Teams";
import { TeamsCalendar } from "@/pages/TeamsCalendar";

export function App() {
    const router = useRoutes([
        {
            path: "/",
            element: <Template />,
            children: [
                {
                    index: true,
                    element: <Leagues />
                },
                {
                    path: "league/:leagueId",
                    element: <LeaguesCalendar />
                },
                {
                    path: "teams",
                    element: <Teams />
                },
                {
                    path: "team/:teamId",
                    element: <TeamsCalendar />
                }
            ]
        },

        {
            path: "*",
            element: <NotFound />
        }
    ]);

    return router;
}
