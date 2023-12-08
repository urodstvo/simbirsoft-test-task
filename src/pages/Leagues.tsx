import { FC, useEffect, useState } from "react";

import { Box, Center, Container, Flex, Loader, Pagination, SimpleGrid, TextInput } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";

import { useGetAllCompetitionsQuery } from "@/api";
import styles from "@/assets/styles/Leagues.module.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LeagueCard } from "@/components/LeagueCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useSetTitle } from "@/hooks";
import { Competition } from "@/types/League";

const filterLeagues = (data: Competition[], searchValue: string) => {
    const searchedMatches = data.filter((league) => {
        return league.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    return searchedMatches;
};

export const Leagues: FC = () => {
    useSetTitle("Лиги");

    const { data, isFetching, isSuccess, isError, refetch } = useGetAllCompetitionsQuery();

    const [searchValue, setSearchValue] = useInputState<string>("");
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 300);

    const [visibleLeagues, setVisibleLeagues] = useState<Competition[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (data) setVisibleLeagues(data.competitions);
    }, [isSuccess]);

    useEffect(() => {
        if (data) {
            const filteredLeagues = filterLeagues(data.competitions, debouncedSearchValue);
            setVisibleLeagues(filteredLeagues);
            setPage(1);
        }
    }, [debouncedSearchValue]);

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
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </Box>
            <Flex direction="column" justify="space-between" columnGap={16} rowGap={32} h="100%">
                {isSuccess && (
                    <>
                        <SimpleGrid className={styles.Grid} cols={{ lg: 3, md: 2, sm: 1 }}>
                            {visibleLeagues.slice(0 + 9 * (page - 1), 9 + 9 * (page - 1)).map((league) => (
                                <LeagueCard league={league} key={league.id} />
                            ))}
                        </SimpleGrid>
                        <Center w="100%" p={16}>
                            <Pagination total={Math.ceil(visibleLeagues.length / 9)} size="md" onChange={setPage} />
                        </Center>
                    </>
                )}
                {isFetching && (
                    <Container>
                        <Loader />
                    </Container>
                )}
                {isError && <ErrorMessage refetch={refetch} />}
            </Flex>
        </Flex>
    );
};
