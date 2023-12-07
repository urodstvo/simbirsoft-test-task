import { FC } from "react";
import { Link } from "react-router-dom";

import { Container, Image, Stack, Text } from "@mantine/core";

import { useAppDispatch } from "@/store";
import { setTeam } from "@/store/slices/team";
import { Team } from "@/types/Team";

export const TeamCard: FC<Team> = (props) => {
    const { id, name, crest } = props;
    const dispatch = useAppDispatch();
    return (
        <Container
            component="article"
            w={"100%"}
            style={{ border: "1px solid #000" }}
            onClick={() => dispatch(setTeam(props))}
        >
            <Link to={`/team/${id}`}>
                <Stack
                    w="100%"
                    align="center"
                    justify="center"
                    p="32px 0 16px"
                    gap={48}
                >
                    <Text>{name}</Text>
                    <Image src={crest} loading="lazy" />
                </Stack>
            </Link>
        </Container>
    );
};
