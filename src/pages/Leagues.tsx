import { FC, useEffect, useState } from "react";

import { Box, Center, Container, Flex, Loader, Pagination, SimpleGrid, TextInput } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";

import { useGetAllCompetitionsQuery } from "@/api";
import styles from "@/assets/styles/LeaguesTeams.module.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LeagueCard } from "@/components/LeagueCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useSetTitle } from "@/hooks";
import type { Competition } from "@/types/League";

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
        <Flex component="main" direction="column">
            <Box>
                <TextInput
                    className={styles.Search}
                    size="sm"
                    placeholder="Поиск"
                    rightSection={<SearchIcon />}
                    rightSectionPointerEvents="none"
                    disabled={isFetching || isError}
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </Box>
            <Flex direction="column" className={styles.Container}>
                {isSuccess && (
                    <>
                        {visibleLeagues.length > 0 && (
                            <SimpleGrid cols={{ lg: 3, md: 2, sm: 1 }}>
                                {visibleLeagues.slice(0 + 9 * (page - 1), 9 + 9 * (page - 1)).map((league) => (
                                    <LeagueCard league={league} key={league.id} />
                                ))}
                            </SimpleGrid>
                        )}
                        {visibleLeagues.length === 0 && (
                            <Center>
                                <p>Совпадений не найдено</p>
                            </Center>
                        )}
                        <Center className={styles.PaginationContainer}>
                            <Pagination
                                defaultValue={1}
                                value={page}
                                total={Math.ceil(visibleLeagues.length / 9)}
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
                {isError && <ErrorMessage refetch={refetch} />}
            </Flex>
        </Flex>
    );
};
