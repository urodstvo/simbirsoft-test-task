import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Box, Breadcrumbs, Center, Flex, Loader, Pagination, Title } from "@mantine/core";
import { DatePickerInput, DateValue, DatesProvider } from "@mantine/dates";

import { useGetMatchesByLeagueIdQuery } from "@/api";
import styles from "@/assets/styles/LeaguesTeamsCalendar.module.css";
import { ErrorMessage } from "@/components/ErrorMessage";
import { MatchesTable } from "@/components/MatchesTable";
import { BreadCrumbsSeparatorIcon } from "@/components/icons/BreadCrumbsSeparatorIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { useCheckLeague, useSetTitle } from "@/hooks";
import "dayjs/locale/ru";

export const LeaguesCalendar: FC = () => {
    const { league, isFetching: isLeagueFetching } = useCheckLeague();

    useSetTitle("Календарь лиги " + league?.name);

    const { leagueId } = useParams();
    const [page, setPage] = useState(1);

    const [dateFrom, setDateFrom] = useState<DateValue>();
    const [dateTo, setDateTo] = useState<DateValue>();

    const [minDate, setMinDate] = useState<string>("");
    const [maxDate, setMaxDate] = useState<string>("");

    const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true);

    const { data, isSuccess, isFetching, isError, refetch } = useGetMatchesByLeagueIdQuery({
        id: leagueId as string,
        from: dateFrom?.toISOString().substring(0, 10) ?? minDate,
        to: dateTo?.toISOString().substring(0, 10) ?? maxDate
    });

    useEffect(() => {
        if (data) {
            if (isFirstQuery) {
                setMinDate(data.resultSet.first);
                setMaxDate(data.resultSet.last);
                setIsFirstQuery(false);
            }
        }
    }, [isSuccess]);

    return (
        <Flex component="main" direction="column">
            <Box w="100%">
                <Breadcrumbs separator={<BreadCrumbsSeparatorIcon />}>
                    <Link to="/">Лиги</Link>
                    <span>
                        {league && league.name}
                        {isLeagueFetching && <Loader size="xs" />}
                    </span>
                </Breadcrumbs>
            </Box>
            <Flex direction="column" className={styles.Container}>
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
                            с
                            <DatePickerInput
                                w={200}
                                size="sm"
                                placeholder="дд.мм.гггг"
                                valueFormat="DD.MM.YYYY"
                                rightSection={<CalendarIcon />}
                                rightSectionPointerEvents="none"
                                onChange={setDateFrom}
                                minDate={new Date(Date.parse(minDate as string))}
                                maxDate={new Date(Date.parse(maxDate as string))}
                                disabled={!isSuccess}
                            />
                            по
                            <DatePickerInput
                                disabled={!isSuccess}
                                w={200}
                                size="sm"
                                placeholder="дд.мм.гггг"
                                valueFormat="DD.MM.YYYY"
                                rightSection={<CalendarIcon />}
                                rightSectionPointerEvents="none"
                                onChange={setDateTo}
                                minDate={new Date(Date.parse(minDate as string))}
                                maxDate={new Date(Date.parse(maxDate as string))}
                            />
                        </DatesProvider>
                    </Flex>
                </Box>
                <Flex direction="column" className={styles.Calendar}>
                    {!isFetching && data && data.matches.length > 0 && (
                        <>
                            <MatchesTable matches={data.matches} page={page} />
                            <Center className={styles.PaginationContainer}>
                                <Pagination size="md" total={Math.ceil(data.resultSet.count / 10)} onChange={setPage} />
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
                    {isError && !data && <ErrorMessage refetch={refetch} />}
                </Flex>
            </Flex>
        </Flex>
    );
};
