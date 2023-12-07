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
    if (selectedTeam) return { team: selectedTeam, isFetching: false };

    const { isError, isFetching, data } = useGetTeamByIdQuery(
        teamId as string,
        {
            skip: !!selectedTeam
        }
    );

    useEffect(() => {
        if (isError) {
            notifications.show({
                title: "Ошибка",
                message: "Такой команды не существует",
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/teams");
        }
    }, [isError]);

    return { team: data, isFetching };
};

export const useCheckLeague = () => {
    const navigate = useNavigate();
    const { leagueId } = useParams();

    const { selectedLeague } = useAppSelector((state) => state.leagues);
    if (selectedLeague) return { league: selectedLeague, isFetching: false };

    const { isError, isFetching, data } = useGetLeagueByIdQuery(
        leagueId as string,
        {
            skip: !!selectedLeague
        }
    );

    useEffect(() => {
        if (isError) {
            notifications.show({
                title: "Ошибка",
                message: "Такой лиги не существует",
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/");
        }
    }, [isError]);

    return { league: data, isFetching };
};
