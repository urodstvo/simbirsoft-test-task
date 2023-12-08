import { FC } from "react";
import { Link } from "react-router-dom";

import { Stack, Text } from "@mantine/core";

import { CardRenderAnimation } from "@/animation/animation";
import styles from "@/assets/styles/LeagueCard.module.css";
import { Competition } from "@/types/League";
import { motion } from "framer-motion";

export const LeagueCard: FC<{ league: Competition }> = ({ league }) => {
    const {
        code,
        name,
        area: { name: areaName }
    } = league;
    return (
        <motion.article className={styles.Container} {...CardRenderAnimation}>
            <Link to={`/league/${code}`}>
                <Stack className={styles.Content}>
                    <Text className={styles.Name}>{name}</Text>
                    <Text className={styles.Area}>{areaName}</Text>
                </Stack>
            </Link>
        </motion.article>
    );
};
