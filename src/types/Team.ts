export type Team = {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: Date;
};

export type Teams = {
    count: number;
    filters: any;
    teams: Array<Team>;
};
