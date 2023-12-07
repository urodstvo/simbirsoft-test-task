import { FC } from "react";
import { Link } from "react-router-dom";

import { Badge, Table } from "@mantine/core";

import { useAppDispatch } from "@/store";
import { setTeam } from "@/store/slices/team";
import type { Match } from "@/types/League";
import { MatchStatus } from "@/types/League";

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
    if (full_home && full_away)
        fulltime_score = `${match.score.fullTime.home}:${match.score.fullTime.away}`;
    else fulltime_score = "0:0";

    return (
        <Table.Tr key={match.id}>
            <Table.Td w={100}>{formattedDate}</Table.Td>
            <Table.Td w={100}>{time}</Table.Td>
            <Table.Td w={200}>
                <Badge color="green" size="md" radius="xs" c="#fff">
                    {MatchStatus[match.status as keyof typeof MatchStatus]}
                </Badge>
            </Table.Td>
            <Table.Td w={250}>
                {match.homeTeam.name ? (
                    <Link
                        to={`/team/${match.homeTeam.id}`}
                        style={{ color: "#000" }}
                        onClick={() =>
                            useAppDispatch()(setTeam(match.homeTeam))
                        }
                    >
                        {match.homeTeam.shortName}
                    </Link>
                ) : (
                    "TBA"
                )}
            </Table.Td>
            <Table.Td w={100}>—</Table.Td>
            <Table.Td w={250}>
                {match.awayTeam ? (
                    <Link
                        to={`/team/${match.awayTeam.id}`}
                        style={{ color: "#000" }}
                        onClick={() =>
                            useAppDispatch()(setTeam(match.awayTeam))
                        }
                    >
                        {match.awayTeam.shortName}
                    </Link>
                ) : (
                    "TBA"
                )}
            </Table.Td>
            <Table.Td>{fulltime_score}</Table.Td>
        </Table.Tr>
    );
};
