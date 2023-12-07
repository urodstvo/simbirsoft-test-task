import { FC } from "react";
import { Link } from "react-router-dom";

import { Container, Stack, Text, Transition } from "@mantine/core";

import styles from "@/assets/styles/LeagueCard.module.css";
import { useAppDispatch } from "@/store";
import { setLeague } from "@/store/slices/league";
import { Competition } from "@/types/League";

export const LeagueCard: FC<{ league: Competition; opened: boolean }> = ({
    league,
    opened
}) => {
    const {
        code,
        name,
        area: { name: areaName }
    } = league;
    const dispatch = useAppDispatch();
    return (
        <Container component="article" className={styles.Container}>
            <Link
                to={`/league/${code}`}
                onClick={() => dispatch(setLeague(league))}
            >
                <Stack
                    w="100%"
                    align="center"
                    justify="center"
                    p="32px 0 16px"
                    gap={48}
                >
                    <Text>{name}</Text>
                    <Text c="#888">{areaName}</Text>
                </Stack>
            </Link>
        </Container>
    );
};
