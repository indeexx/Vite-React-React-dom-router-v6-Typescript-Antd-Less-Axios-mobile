import { lazy } from "react"
const Home = lazy(() => import('./../pages/Home'));
const NotFound = lazy(() => import('./../pages/NotFound'));
const About = lazy(() => import('./../pages/About'));

const Routes: any = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "about",
        element: About,
    },
    {
        path: "404",
        element: NotFound,
    },
]

export default Routes;
