import { Spin } from "antd";
import { Suspense, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import NotFoundPage from "./pages/_404/_404";
import { routes } from "./routes/routes";

const SuspenseFallback = () => {
    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            <Spin size="large" />
        </div>
    );
};

function App() {
    const publicRoutes = useMemo(() => routes.filter((x) => x.public), [routes]);
    const privateRoutes = useMemo(() => routes.filter((x) => !x.public), [routes]);

    return (
        <BrowserRouter>
            <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                    <Route element={<Dashboard />}>
                        {privateRoutes.map(({ component: Component, path }) => (
                            <Route path={path} element={<Component />} key={path} />
                        ))}
                        <Route path="/page-not-found" element={<NotFoundPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    {publicRoutes.map(({ component: Component, path }) => (
                        <Route path={path} element={<Component />} key={path} />
                    ))}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
