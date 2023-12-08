import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { notifications } from "@mantine/notifications";

import { useGetLeagueByIdQuery, useGetTeamByIdQuery } from "@/api";
import errorStyles from "@/assets/styles/ErrorNotification.module.css";
import { useAppSelector } from "@/store";

export const useCheckTeam = () => {
    const navigate = useNavigate();
    const { teamId } = useParams();

    const { selectedTeam } = useAppSelector((state) => state.teams);

    const { isError, isFetching, data } = useGetTeamByIdQuery(teamId as string, {
        skip: !!selectedTeam
    });

    useEffect(() => {
        if (isError) {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка при загрузке команды",
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/teams");
        }
    }, [isError]);

    if (selectedTeam) return { team: selectedTeam, isFetching: false };
    return { team: data, isFetching };
};

export const useCheckLeague = () => {
    const navigate = useNavigate();
    const { leagueId } = useParams();

    const { selectedLeague } = useAppSelector((state) => state.leagues);

    const { isError, isFetching, data } = useGetLeagueByIdQuery(leagueId as string, {
        skip: !!selectedLeague
    });

    useEffect(() => {
        if (isError) {
            notifications.show({
                title: "Ошибка",
                message: "Ошибка при загрузке лиги",
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/");
        }
    }, [isError]);

    if (selectedLeague) return { league: selectedLeague, isFetching: false };
    return { league: data, isFetching };
};

export const useSetTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | SockerStat`;
    }, [title]);
};
