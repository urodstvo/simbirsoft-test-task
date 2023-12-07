import { FC } from "react";
import { NavLink } from "react-router-dom";

import { Box, Flex, Group, Image, Text } from "@mantine/core";

export const Navigation: FC = () => {
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
                <NavLink to="/">
                    <Text size="lg" p="0 8" c="#000">
                        Лиги
                    </Text>
                </NavLink>
                <NavLink to="/teams">
                    <Text size="lg" p="0 8" c="#000">
                        Команды
                    </Text>
                </NavLink>
            </Group>
        </Flex>
    );
};
