import Home from "./../pages/Home"
import About from "./../pages/About"
import NotFound from "./../pages/NotFound"

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