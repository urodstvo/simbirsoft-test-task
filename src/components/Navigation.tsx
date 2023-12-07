import { FC, ReactNode } from "react";
import { NavLink, useMatch } from "react-router-dom";

import { Box, Flex, Group, Image, Text } from "@mantine/core";

import { motion } from "framer-motion";

const NavigationLink: FC<{
    to: string;
    children: ReactNode;
    underlined?: boolean;
}> = ({ to, children, underlined = false }) => {
    return (
        <NavLink to={to} style={{ position: "relative" }}>
            <Text size="lg" p="0 8" c="#000">
                {children}
            </Text>
            {!!underlined && (
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: "-16px",
                        left: "0px",
                        right: 0,
                        height: "4px",
                        background: "#5686F5",
                        borderRadius: "8px",
                        zIndex: 0
                    }}
                    layoutId="underline"
                />
            )}
        </NavLink>
    );
};

export const Navigation: FC = () => {
    const LeaguesMatch = useMatch("/");
    const LeagueMatch = useMatch("league/:leagueId");
    const TeamsMatch = useMatch("teams");
    const TeamMatch = useMatch("team/:teamId");
    return (
        <Flex
            p="0 40px"
            component="nav"
            align="center"
            gap={32}
            w="var(--screen-width)"
            h="60px"
            bg="rgba(0, 0, 0, 0.05)"
        >
            <Box w="200px" h="50px">
                <Image w="100%" h="100%" fit="cover" />
            </Box>
            <Group justify="space-between" gap={16}>
                <NavigationLink
                    to="/"
                    underlined={!!LeaguesMatch || !!LeagueMatch}
                >
                    Лиги
                </NavigationLink>
                <NavigationLink
                    to="/teams"
                    underlined={!!TeamsMatch || !!TeamMatch}
                >
                    Команды
                </NavigationLink>
            </Group>
        </Flex>
    );
};
