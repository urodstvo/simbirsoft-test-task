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

import { useGetAllCompetitionsQuery } from "@/api";
import { LeagueCard } from "@/components/LeagueCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Competition } from "@/types/League";

export const Leagues: FC = () => {
    const { data, isFetching, isSuccess, isError, refetch } =
        useGetAllCompetitionsQuery();

    const [visibleLeagues, setVisibleLeagues] = useState<Competition[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (data) setVisibleLeagues(data.competitions.slice(0, 9));
    }, [isSuccess]);

    useEffect(() => {
        if (data)
            setVisibleLeagues(
                data.competitions.slice(0 + 9 * (page - 1), 9 + 9 * (page - 1))
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
                    disabled={isFetching || isError}
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
                        <SimpleGrid cols={3}>
                            {visibleLeagues.map((league) => (
                                <LeagueCard league={league} key={league.id} />
                            ))}
                        </SimpleGrid>
                        <Center w="100%" p={16}>
                            <Pagination
                                total={Math.ceil(data.count / 9)}
                                size="md"
                                onChange={setPage}
                            />
                        </Center>
                    </>
                )}
                {isFetching && (
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
                            Произошла ошибка при загрузке лиг
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
