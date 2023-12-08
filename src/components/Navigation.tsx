import { FC, ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";

import { Box, Flex, Group, Image, Text } from "@mantine/core";

import styles from "@/assets/styles/Navigation.module.css";
import { motion } from "framer-motion";

import { LogoIcon } from "./icons/LogoIcon";

const NavigationLink: FC<{
    to: string;
    children: ReactNode;
    underlined?: boolean;
}> = ({ to, children, underlined = false }) => {
    return (
        <NavLink to={to} className={styles.LinkContainer}>
            <Text className={styles.Link}>{children}</Text>
            {underlined && <motion.div className={styles.Underline} layoutId="underline" />}
        </NavLink>
    );
};

export const Navigation: FC = () => {
    const LeaguesMatch = useMatch("/");
    const LeagueMatch = useMatch("league/:leagueId");
    const TeamsMatch = useMatch("teams");
    const TeamMatch = useMatch("team/:teamId");
    return (
        <Flex className={styles.Header}>
            <Box className={styles.LogoContainer}>
                <LogoIcon />
            </Box>
            <Group className={styles.Navigation}>
                <NavigationLink to="/" underlined={!!LeaguesMatch || !!LeagueMatch}>
                    Лиги
                </NavigationLink>
                <NavigationLink to="/teams" underlined={!!TeamsMatch || !!TeamMatch}>
                    Команды
                </NavigationLink>
            </Group>
        </Flex>
    );
};
