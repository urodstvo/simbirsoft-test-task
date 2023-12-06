import { useRoutes } from "react-router-dom";

export function App() {
    return useRoutes([
        {
            path: "/",
            element: <div>Hello</div>
        }
    ]);
}
