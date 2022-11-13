import { lazy } from "react";

export const routes = [
    {
        path: "/",
        component: lazy(() => import("../pages/home")),
        exact: "exact",
        public: false,
    },
    {
        path: "/login",
        component: lazy(() => import("../pages/login")),
        exact: "exact",
        public: true,
    },
    {
        path: "/register",
        component: lazy(() => import("../pages/register")),
        exact: "exact",
        public: true,
    },
    {
        path: "/profile",
        component: lazy(() => import("../pages/profile")),
        exact: "exact",
        public: false,
    },
    {
        path: "/class/:slug",
        component: lazy(() => import("../pages/class")),
        exact: "exact",
        public: false,
    },
    {
        path: "/classes/:status",
        component: lazy(() => import("../pages/classes")),
        exact: "exact",
        public: false,
    },
];
