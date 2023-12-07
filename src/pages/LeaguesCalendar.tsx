import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    Box,
    Breadcrumbs,
    Button,
    Center,
    Flex,
    Loader,
    Pagination,
    Table,
    Title
} from "@mantine/core";
import { DatePickerInput, DateValue, DatesProvider } from "@mantine/dates";

import { useGetMatchesByLeagueIdQuery } from "@/api";
import { MatchesTableRow } from "@/components/MatchesTableRow";
import { BreadCrumbsSeparatorIcon } from "@/components/icons/BreadCrumbsSeparatorIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { useCheckLeague } from "@/hooks";
import "dayjs/locale/ru";

export const LeaguesCalendar: FC = () => {
    const { league, isFetching: isLeagueFetching } = useCheckLeague();

    const { leagueId } = useParams();
    const [page, setPage] = useState(1);

    const [dateFrom, setDateFrom] = useState<DateValue>();
    const [dateTo, setDateTo] = useState<DateValue>();

    const [minDate, setMinDate] = useState<string>("");
    const [maxDate, setMaxDate] = useState<string>("");

    const [isFirstQuery, setIsFirstQuery] = useState<boolean>(true);

    const { data, isSuccess, isFetching, isError, refetch } =
        useGetMatchesByLeagueIdQuery({
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
        <Flex
            component="main"
            p="16px 40px"
            w="var(--screen-width)"
            align="stretch"
            h="calc(100dvh - 60px)"
            direction="column"
            gap={16}
        >
            <Box w="100%">
                <Breadcrumbs separator={<BreadCrumbsSeparatorIcon />}>
                    <Link to="/">Лиги</Link>
                    <span>
                        {league && league.name}
                        {isLeagueFetching && <Loader size="xs" />}
                    </span>
                </Breadcrumbs>
            </Box>
            <Flex w="100%" h="100%" direction="column">
                <Title w="100%" size="h2">
                    Матчи
                </Title>
                <Box>
                    <Flex align="center" gap={24}>
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
                                minDate={
                                    new Date(Date.parse(minDate as string))
                                }
                                maxDate={
                                    new Date(Date.parse(maxDate as string))
                                }
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
                                minDate={
                                    new Date(Date.parse(minDate as string))
                                }
                                maxDate={
                                    new Date(Date.parse(maxDate as string))
                                }
                            />
                        </DatesProvider>
                    </Flex>
                </Box>
                <Flex
                    direction="column"
                    align="center"
                    justify="space-between"
                    h="100%"
                    w="100%"
                    rowGap={16}
                    mt={16}
                >
                    {!isFetching && data && (
                        <>
                            <Table withTableBorder>
                                <Table.Tbody>
                                    {data.matches
                                        .slice(
                                            0 + 11 * (page - 1),
                                            11 + 11 * (page - 1)
                                        )
                                        .map((match) => (
                                            <MatchesTableRow
                                                key={match.id}
                                                match={match}
                                            />
                                        ))}
                                </Table.Tbody>
                            </Table>
                            <Center p={16}>
                                <Pagination
                                    size="md"
                                    total={Math.ceil(data.resultSet.count / 11)}
                                    onChange={setPage}
                                />
                            </Center>
                        </>
                    )}
                    {isFetching && (
                        <Center>
                            <Loader />
                        </Center>
                    )}
                    {isError && (
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            h="100%"
                        >
                            <Title size="h2">
                                При загрузке матчей произошла ошибка.
                            </Title>
                            <Title size="h4" c="#444">
                                Немного подождите и попробуйте ещё раз
                            </Title>
                            <Button mt={64} onClick={refetch}>
                                Попробовать еще раз
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};
