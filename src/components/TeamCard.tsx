import { FC } from "react";
import { Link } from "react-router-dom";

import { Image, Stack, Text } from "@mantine/core";

import { CardRenderAnimation } from "@/animation/animation";
import styles from "@/assets/styles/TeamCard.module.css";
import { useAppDispatch } from "@/store";
import { setTeam } from "@/store/slices/team";
import { Team } from "@/types/Team";
import { motion } from "framer-motion";

export const TeamCard: FC<Team> = (props) => {
    const { id, name, crest } = props;
    const dispatch = useAppDispatch();
    return (
        <motion.article className={styles.Container} {...CardRenderAnimation}>
            <Link to={`/team/${id}`} onClick={() => dispatch(setTeam(props))}>
                <Stack className={styles.Content}>
                    <Text className={styles.Name}>{name}</Text>
                    <motion.div
                        layout
                        whileHover={{ scale: 1.35 }}
                        transition={{ duration: 0.2 }}
                        className={styles.ImageContainer}
                    >
                        <Image src={crest} loading="lazy" className={styles.Image} />
                    </motion.div>
                </Stack>
            </Link>
        </motion.article>
    );
};
