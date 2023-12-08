export type Competition = {
    id: number;
    area: {
        id: number;
        name: string;
        code: string;
        flag: any;
    };
    name: string;
    code: string;
    type: string;
    emblem: any;
    plan: string;
    currentSeason: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number;
        winner: any;
    };
    numberOfAvailableSeasons: number;
    lastUpdated: Date;
};

export type Competitions = {
    count: number;
    filters: object;
    competitions: Array<Competition>;
};
