import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Navigation } from "@/components/Navigation";

export const Template: FC = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};
