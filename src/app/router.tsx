import {
    createBrowserRouter,
    Outlet,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Ministries from "../pages/Ministries/Ministries";
import ProjectHeal from "../pages/ProjectHeal/ProjectHeal";
import ProjectMove from "../pages/ProjectMove/ProjectMove";
import Chapters from "../pages/Chapters/Chapters";
import ChapterDetail from "../pages/ChapterDetail/ChapterDetail";
import Events from "../pages/Events/Events";
import EventDetail from "../pages/EventDetail/EventDetail";
import Media from "../pages/Media/Media";
import InviteUs from "../pages/InviteUs/InviteUs";
import Volunteer from "../pages/Volunteer/Volunteer";
import NotFound from "../pages/NotFound";

function RootLayout() {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/ministries",
                element: <Ministries />,
            },
            {
                path: "/project-heal",
                element: <ProjectHeal />,
            },
            {
                path: "/project-move",
                element: <ProjectMove />,
            },
            {
                path: "/chapters",
                element: <Chapters />,
            },
            {
                path: "/chapters/:slug",
                element: <ChapterDetail />,
            },
            {
                path: "/events",
                element: <Events />,
            },
            {
                path: "/events/:slug",
                element: <EventDetail />,
            },
            {
                path: "/media",
                element: <Media />,
            },
            {
                path: "/invite-us",
                element: <InviteUs />,
            },
            {
                path: "/volunteer",
                element: <Volunteer />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ],
    },
]);