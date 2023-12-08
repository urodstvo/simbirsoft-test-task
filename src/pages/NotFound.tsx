import { Link } from "react-router-dom";

import { Box, Button, Flex, Title } from "@mantine/core";

import { useSetTitle } from "@/hooks";

export const NotFound = () => {
    useSetTitle("404");
    return (
        <Flex h="100dvh" w="100%" direction="column" justify="center" align="center">
            <Title size="h1" fz={150}>
                404
            </Title>
            <Title size="h3" c="gray">
                Страница не найдена
            </Title>
            <Box mt={64}>
                <Link to="/">
                    <Button size="xl">Вернуться на главную</Button>
                </Link>
            </Box>
        </Flex>
    );
};
