import React from "react";
import "./app.scss";
import Filter from "./componets/Views/Filter/Filter";
import { observer } from "mobx-react-lite";
import { Routes, Route } from "react-router-dom";
import Schedule from "./componets/Views/Schedule/Schedule";
import DivisionLessons from "./componets/Views/TvDivisionLessons/DivisionLessons/DivisionLessons";
import Cabinets from "./componets/Views/Cabinets/Cabinets";
import DivisionLessonsFilter from "./componets/Views/TvDivisionLessons/DivisionLessonsFilter";
import NotFound from "./componets/Views/NotFound/NotFound";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

function App() {
    return (
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Routes>
                <Route path="/timetable">
                    <Route index element={<Filter />} />
                    <Route
                        path="group/:id"
                        element={<Schedule mode="group" />}
                    />
                    <Route
                        path="teacher/:id"
                        element={<Schedule mode="teacher" />}
                    />
                    <Route path="cabinet/:id" element={<Cabinets />} />
                    <Route path="divisions">
                        <Route path="" element={<DivisionLessonsFilter />} />
                        <Route path=":id" element={<DivisionLessons />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </QueryParamProvider>
    );
}

export default observer(App);
