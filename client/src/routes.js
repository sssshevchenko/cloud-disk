import { DISK_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Disk from "./pages/Disk";
import Profile from "./pages/Profile";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    }
]

export const authRoutes = [
    {
        path: DISK_ROUTE,
        element: <Disk />
    },
    {
        path: PROFILE_ROUTE,
        element: <Profile />
    }
]