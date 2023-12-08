import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { notifications } from "@mantine/notifications";

import { useGetLeagueByIdQuery, useGetTeamByIdQuery } from "@/api";
import errorStyles from "@/assets/styles/ErrorNotification.module.css";

export const useCheckTeam = (teamId: string) => {
    const navigate = useNavigate();

    const { isError, isFetching, data, error } = useGetTeamByIdQuery(teamId as string);

    useLayoutEffect(() => {
        if (isError && error) {
            // @ts-ignore
            const { status, data } = error;
            let message: string = "Неотработанная ошибка";

            if (status === 403) message = "Доступ к данным выбранной команды запрещен";
            if (status === 400) message = "Данной команды не существует";
            if (status === 429) message = "Превышен лимит запросов";

            notifications.show({
                title: "Ошибка",
                message,
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/teams");
        }
    }, [isError]);

    return { team: data, isFetching };
};

export const useCheckLeague = (leagueId: string) => {
    const navigate = useNavigate();

    const { isError, isFetching, data, error } = useGetLeagueByIdQuery(leagueId as string);

    useLayoutEffect(() => {
        if (isError && error) {
            // @ts-ignore
            const { status, data } = error;
            let message: string = "Неотработанная ошибка";

            if (status === 403) message = "Доступ к данным выбранной лиги запрещен";
            if (status === 400) message = "Данной лиги не существует";
            if (status === 429) message = "Превышен лимит запросов";

            notifications.show({
                title: "Ошибка",
                message,
                color: "#C33333",
                classNames: errorStyles
            });
            return navigate("/");
        }
    }, [isError]);

    return { league: data, isFetching };
};

export const useSetTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | SockerStat`;
    }, [title]);
};
