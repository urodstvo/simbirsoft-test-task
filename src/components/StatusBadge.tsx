import { FC } from "react";

import { Badge } from "@mantine/core";

import { MatchStatus } from "@/types/Match";

export const StatusBadge: FC<{ variant: MatchStatus }> = ({ variant }) => {
    let badgeColor: string = "";
    let textColor: string = "";

    switch (variant) {
        case MatchStatus.SCHEDULED:
            badgeColor = "blue";
            textColor = "#fff";
            break;
        case MatchStatus.AWARDED:
            badgeColor = "yellow";
            textColor = "#fff";
            break;
        case MatchStatus.CANCELED:
            badgeColor = "red";
            textColor = "#fff";
            break;
        case MatchStatus.EXTRA_TIME:
            badgeColor = "green";
            textColor = "#fff";
            break;
        case MatchStatus.FINISHED:
            badgeColor = "gray";
            textColor = "#fff";
            break;
        case MatchStatus.IN_PLAY:
            badgeColor = "green";
            textColor = "#fff";
            break;
        case MatchStatus.PAUSED:
            badgeColor = "gray";
            textColor = "#fff";
            break;
        case MatchStatus.POSTPONED:
            badgeColor = "blue";
            textColor = "#fff";
            break;
        case MatchStatus.SUSPENDED:
            badgeColor = "gray";
            textColor = "#fff";
            break;
        case MatchStatus.TIMED:
            badgeColor = "orange";
            textColor = "#fff";
            break;
    }

    return (
        <Badge color={badgeColor} size="md" radius="xs" c={textColor}>
            {variant}
        </Badge>
    );
};
