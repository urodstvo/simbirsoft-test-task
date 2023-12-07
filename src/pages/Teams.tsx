import { FC, useEffect, useState } from "react";

import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Loader,
    Pagination,
    SimpleGrid,
    Text,
    TextInput,
    Title
} from "@mantine/core";

import { useGetAllTeamsQuery } from "@/api";
import { TeamCard } from "@/components/TeamCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Team } from "@/types/Team";

export const Teams: FC = () => {
    const { data, isLoading, isSuccess, isError, refetch } =
        useGetAllTeamsQuery();

    const [visibleTeams, setVisibleTeams] = useState<Team[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (data) setVisibleTeams(data.teams.slice(0, 10));
    }, [isSuccess]);

    useEffect(() => {
        if (data)
            setVisibleTeams(
                data.teams.slice(0 + 10 * (page - 1), 10 + 10 * (page - 1))
            );
    }, [page]);

    return (
        <Flex
            component="main"
            p="16px 40px"
            w="var(--screen-width)"
            align="stretch"
            h="calc(100dvh - 60px)"
            direction="column"
            gap={16}
        >
            <Box>
                <TextInput
                    w={300}
                    size="sm"
                    placeholder="Поиск"
                    rightSection={<SearchIcon />}
                    disabled={isLoading || isError}
                />
            </Box>
            <Flex
                direction="column"
                justify="space-between"
                columnGap={16}
                rowGap={32}
                h="100%"
            >
                {isSuccess && (
                    <>
                        <SimpleGrid cols={5}>
                            {visibleTeams.map((team, ind) => (
                                <TeamCard {...team} key={team.id} />
                            ))}
                        </SimpleGrid>
                        <Center w="100%" p={16}>
                            <Pagination
                                total={Math.ceil(data.count / 10)}
                                size="md"
                                onChange={setPage}
                            />
                        </Center>
                    </>
                )}
                {isLoading && (
                    <Container>
                        <Loader />
                    </Container>
                )}
                {isError && (
                    <Flex
                        h="100%"
                        direction="column"
                        justify="center"
                        align="center"
                    >
                        <Title size="h2">
                            Произошла ошибка при загрузке команд
                        </Title>
                        <Text size="h4" c="#444">
                            Попробуйте немного подождать и попробовать снова
                        </Text>
                        <Button mt={64} onClick={refetch}>
                            Попробовать ещё раз
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
