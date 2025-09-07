import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import Usage from "./pages/Usage";

const NotFound = lazy(() => import("./components/NotFound"));

export const AppRouter = () => (
    <Suspense fallback={<PageLoader text="Please wait while we load your application" />}>
        <Routes>
            {process.env.NODE_ENV === "development" && <Route path="/usage" element={<Usage />} />}

            <Route element={NotFound} />
        </Routes>
    </Suspense>
);
