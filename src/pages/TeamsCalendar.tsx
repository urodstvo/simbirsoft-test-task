import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Box, Breadcrumbs, Center, Flex, Loader, Pagination, Title } from "@mantine/core";
import { DatePickerInput, DatesProvider, DatesRangeValue } from "@mantine/dates";

import { useGetMatchesByTeamIdQuery } from "@/api";
import styles from "@/assets/styles/LeaguesTeamsCalendar.module.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { MatchesTable } from "@/components/MatchesTable";
import { BreadCrumbsSeparatorIcon } from "@/components/icons/BreadCrumbsSeparatorIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { useCheckTeam, useSetTitle } from "@/hooks";
import "dayjs/locale/ru";

export const TeamsCalendar: FC = () => {
    const { teamId } = useParams();
    const { team, isFetching: isTeamFetching } = useCheckTeam(teamId as string);

    useSetTitle("Календарь команды " + team?.name);

    const [page, setPage] = useState(1);

    const [dates, setDates] = useState<DatesRangeValue>();

    const { data, isSuccess, isError, isFetching, refetch } = useGetMatchesByTeamIdQuery(
        {
            id: teamId as string,
            from: dates?.[0]?.toISOString().substring(0, 10) ?? "",
            to: dates?.[1]?.toISOString().substring(0, 10) ?? ""
        },
        { skip: !!dates?.[0] !== !!dates?.[1] }
    );

    useEffect(() => {
        setPage(1);
    }, [isSuccess]);

    return (
        <Flex component="main" direction="column">
            <Box w="100%">
                <Breadcrumbs separator={<BreadCrumbsSeparatorIcon />}>
                    <Link to="/teams">Команды</Link>
                    <span>
                        {!isTeamFetching && team && team.name}
                        {isTeamFetching && <Loader size="xs" />}
                    </span>
                </Breadcrumbs>
            </Box>
            <Flex className={styles.Container} direction="column">
                <Title w="100%" size="h2">
                    Матчи
                </Title>
                <Box>
                    <Flex className={styles.CalendarContainer}>
                        <DatesProvider
                            settings={{
                                locale: "ru",
                                timezone: "UTC"
                            }}
                        >
                            <DatePickerInput
                                w={300}
                                size="sm"
                                type="range"
                                onChange={setDates}
                                rightSection={<CalendarIcon />}
                                rightSectionPointerEvents="none"
                                placeholder="дд.мм.гггг - дд.мм.гггг"
                                valueFormat="DD.MM.YYYY"
                                disabled={!isSuccess}
                            />
                        </DatesProvider>
                    </Flex>
                </Box>
                <Flex direction="column" className={styles.Calendar}>
                    {!isError && !isFetching && data && data.matches.length > 0 && (
                        <>
                            <MatchesTable matches={data.matches} page={page} />
                            <Center className={styles.PaginationContainer} key={teamId}>
                                <Pagination
                                    defaultValue={1}
                                    value={page}
                                    key={teamId}
                                    size="md"
                                    total={Math.ceil(data.resultSet.count / 10)}
                                    onChange={setPage}
                                />
                            </Center>
                        </>
                    )}
                    {!isFetching && data && data.matches.length === 0 && (
                        <Center>
                            <Title size="h2">В указанном промежутке времени матчей не найдено</Title>
                        </Center>
                    )}
                    {isFetching && (
                        <Center>
                            <Loader />
                        </Center>
                    )}
                    {isError && <ErrorMessage refetch={refetch} />}
                </Flex>
            </Flex>
        </Flex>
    );
};
