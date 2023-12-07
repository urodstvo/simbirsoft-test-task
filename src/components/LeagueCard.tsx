import { FC } from "react";
import { Link } from "react-router-dom";

import { Stack, Text } from "@mantine/core";

import { CardRenderAnimation } from "@/animation/animation";
import styles from "@/assets/styles/LeagueCard.module.css";
import { useAppDispatch } from "@/store";
import { setLeague } from "@/store/slices/league";
import { Competition } from "@/types/League";
import { motion } from "framer-motion";

export const LeagueCard: FC<{ league: Competition }> = ({ league }) => {
    const {
        code,
        name,
        area: { name: areaName }
    } = league;
    const dispatch = useAppDispatch();
    return (
        <motion.article
            layout
            className={styles.Container}
            {...CardRenderAnimation}
        >
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
        </motion.article>
    );
};
