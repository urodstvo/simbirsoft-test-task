export type Competition = {
    id: number;
    area: {
        id: number;
        name: string;
        code: string;
        flag: unknown;
    };
    name: string;
    code: string;
    type: string;
    emblem: unknown;
    plan: string;
    currentSeason: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number;
        winner: unknown;
    };
    numberOfAvailableSeasons: number;
    lastUpdated: Date;
};

export type Competitions = {
    count: number;
    filters: object;
    competitions: Array<Competition>;
};
