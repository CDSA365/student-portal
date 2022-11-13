import { Spin } from "antd";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import NotFoundPage from "./pages/_404/_404";
import { routes } from "./routes/routes";

function App() {
    const publicRoutes = routes.filter((x) => x.public);
    const privateRoutes = routes.filter((x) => !x.public);
    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Routes>
                    <Route element={<Dashboard />}>
                        {privateRoutes.map(({ component: Component, path }) => (
                            <Route
                                path={path}
                                element={<Component />}
                                key={path}
                            />
                        ))}
                        <Route
                            path="/page-not-found"
                            element={<NotFoundPage />}
                        />
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
