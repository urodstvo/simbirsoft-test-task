import { FC } from "react";
import { Link } from "react-router-dom";

import { Button, Flex, Text, Title } from "@mantine/core";

export const ErrorMessage: FC<{ refetch: () => any }> = ({ refetch }) => {
    return (
        <Flex h="100%" w="100%" direction="column" justify="center" align="center">
            <Title size="h2" ta="center">
                При загрузке данных произошла ошибка
            </Title>
            <Text size="h4" c="#444" ta="center">
                Попробуйте немного подождать и попробовать снова
            </Text>
            <Flex align="center" justify="center" rowGap={16} columnGap={32} w="100%" wrap="wrap" mt={48}>
                <Button onClick={refetch}>Попробовать ещё раз</Button>
                <Link to="/">
                    <Button color="gray">Вернуться на главную</Button>
                </Link>
            </Flex>
        </Flex>
    );
};
