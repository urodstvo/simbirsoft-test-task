import { Competition } from "@/types/League";

export type Matches = {
    filters: object;
    resultSet: {
        count: number;
        first: string;
        last: string;
        played: number;
    };
    competition: {
        id: number;
        name: string;
        code: string;
        type: string;
        emblem: string;
    };
    matches: Array<Match>;
};

export type Match = {
    area: {
        id: number;
        name: string;
        code: string;
        flag: string;
    };
    competition: Partial<Competition>;
    season: {
        id: number;
        startDate: Date;
        endDate: Date;
        currentMatchday: number;
        winner: unknown;
        stages: Array<unknown>;
    };
    id: number;
    utcDate: Date;
    status: string;
    minute: string;
    injuryTime: number;
    attendance: null;
    venue: string;
    matchday: number;
    stage: string;
    group: unknown;
    lastUpdated: Date;
    homeTeam: Team;
    awayTeam: Team;
    score: {
        winner: string;
        duration: string;
        fullTime: {
            home: number;
            away: number;
        };
        halfTime: {
            home: number;
            away: number;
        };
    };
    goals: Array<Goal>;
    penalties: Array<unknown>;
    bookings: Array<unknown>;
    substitutions: Array<unknown>;
    odds: {
        homeWin: number;
        draw: number;
        awayWin: number;
    };
    referees: Array<Person>;
};

export type Team = {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: Person;
    leagueRank: number;
    formation: string;
    lineup: Array<unknown>;
    bench: Array<unknown>;
};

export type Person = {
    id: number;
    name: string;
    type?: string;
    nationality: string;
};

export enum GoalType {
    regular = "REGULAR",
    own = "OWN",
    prenalty = "PENALTY"
}

export type Goal = {
    minute: number;
    injuryTime: number | null;
    type: string;
    team: {
        id: number;
        name: string;
    };
    scorer: {
        id: number;
        name: string;
    };
    assist: {
        id: number;
        name: string;
    } | null;
    score: {
        home: number;
        away: number;
    };
};

export enum MatchStatus {
    SCHEDULED = "Запланирован",
    TIMED = "Ожидается",
    IN_PLAY = "В эфире",
    PAUSED = "Пауза",
    EXTRA_TIME = "Дополнительное время",
    FINISHED = "Завершен",
    POSTPONED = "Отложен",
    SUSPENDED = "Прерван",
    CANCELED = "Отменен",
    AWARDED = "Награжден"
}
