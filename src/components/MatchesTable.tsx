import type { FC } from "react";

import { Table } from "@mantine/core";

import styles from "@/assets/styles/MatchesTable.module.css";
import { MatchesTableRow } from "@/components/MatchesTableRow";
import type { Match } from "@/types/League";

export const MatchesTable: FC<{ matches: Array<Match>; page: number }> = ({ matches, page }) => {
    return (
        <Table withTableBorder highlightOnHover className={styles.Table}>
            <Table.Thead className={styles.TableHead}>
                <Table.Tr>
                    <Table.Th>Дата</Table.Th>
                    <Table.Th>Время</Table.Th>
                    <Table.Th>Статус</Table.Th>
                    <Table.Th>Домашняя команда</Table.Th>
                    <Table.Th></Table.Th>
                    <Table.Th>Гостевая команда</Table.Th>
                    <Table.Th>Счет</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {matches.slice(0 + 10 * (page - 1), 10 + 10 * (page - 1)).map((match) => (
                    <MatchesTableRow key={match.id} match={match} />
                ))}
            </Table.Tbody>
        </Table>
    );
};
