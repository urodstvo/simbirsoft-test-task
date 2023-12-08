import { FC, useEffect, useState } from "react";

import { Box, Center, Container, Flex, Loader, Pagination, SimpleGrid, TextInput } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";

import { useGetAllTeamsQuery } from "@/api";
import styles from "@/assets/styles/LeaguesTeams.module.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { TeamCard } from "@/components/TeamCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useSetTitle } from "@/hooks";
import type { Team } from "@/types/Team";

const filterTeams = (data: Team[], searchValue: string) => {
    const searchedTeams = data.filter((team) => {
        return team.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    return searchedTeams;
};
export const Teams: FC = () => {
    useSetTitle("Команды");
    const { data, isLoading, isSuccess, isError, refetch } = useGetAllTeamsQuery();

    const [searchValue, setSearchValue] = useInputState<string>("");
    const [debouncedSearchValue] = useDebouncedValue(searchValue, 300);

    const [visibleTeams, setVisibleTeams] = useState<Team[]>([]);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        if (data) setVisibleTeams(data.teams);
    }, [isSuccess]);

    useEffect(() => {
        if (data) {
            const filteredTeams = filterTeams(data.teams, debouncedSearchValue);
            setVisibleTeams(filteredTeams);
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
                    disabled={isLoading || isError}
                    value={searchValue}
                    onChange={setSearchValue}
                />
            </Box>
            <Flex direction="column" className={styles.Container}>
                {isSuccess && (
                    <>
                        <SimpleGrid cols={{ sm: 2, md: 3, xl: 5 }}>
                            {visibleTeams.slice(0 + 10 * (page - 1), 10 + 10 * (page - 1)).map((team) => (
                                <TeamCard {...team} key={team.id} />
                            ))}
                        </SimpleGrid>
                        <Center className={styles.PaginationContainer}>
                            <Pagination total={Math.ceil(visibleTeams.length / 10)} size="md" onChange={setPage} />
                        </Center>
                    </>
                )}
                {isLoading && (
                    <Container>
                        <Loader />
                    </Container>
                )}
                {isError && <ErrorMessage refetch={refetch} />}
            </Flex>
        </Flex>
    );
};
