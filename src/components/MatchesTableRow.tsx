import { FC } from "react";
import { NavLink } from "react-router-dom";

import { Table, Text } from "@mantine/core";

import { StatusBadge } from "@/components/StatusBadge";
import type { Match } from "@/types/Match";
import { MatchStatus } from "@/types/Match";

export const MatchesTableRow: FC<{ match: Match }> = ({ match }) => {
    const { utcDate } = match;
    const localedDate = new Date(Date.parse(utcDate.toLocaleString()));
    const date = new Date(Date.parse(localedDate.toISOString().split("T")[0]));
    const time = localedDate.toTimeString().split(" ")[0].slice(0, 5);

    let formattedDate = "";
    if (date.getDate() < 10) formattedDate += `0${date.getDate()}`;
    else formattedDate += `${date.getDate()}`;

    if (date.getMonth() + 1 < 10) formattedDate += `.0${date.getMonth() + 1}`;
    else formattedDate += `.${date.getMonth() + 1}`;

    formattedDate += `.${date.getFullYear()}`;

    const full_home = match.score.fullTime.home;
    const full_away = match.score.fullTime.away;

    let fulltime_score;
    if (full_home && full_away) fulltime_score = `${match.score.fullTime.home}:${match.score.fullTime.away}`;
    else fulltime_score = "0:0";

    return (
        <Table.Tr key={match.id}>
            <Table.Td>{formattedDate}</Table.Td>
            <Table.Td>{time}</Table.Td>
            <Table.Td>
                <StatusBadge variant={MatchStatus[match.status as keyof typeof MatchStatus]} />
            </Table.Td>
            <Table.Td>
                {match.homeTeam.name ? (
                    <NavLink to={`/team/${match.homeTeam.id}`}>
                        <Text c="#000">{match.homeTeam.name}</Text>
                    </NavLink>
                ) : (
                    "TBA"
                )}
            </Table.Td>
            <Table.Td>—</Table.Td>
            <Table.Td>
                {match.awayTeam ? (
                    <NavLink to={`/team/${match.awayTeam.id}`}>
                        <Text c="#000">{match.awayTeam.name}</Text>
                    </NavLink>
                ) : (
                    "TBA"
                )}
            </Table.Td>
            <Table.Td>{fulltime_score}</Table.Td>
        </Table.Tr>
    );
};
