import React from "react";
import "./app.scss";
import Filter from "./componets/Views/Filter/Filter";
import {observer} from "mobx-react-lite";
import {Routes, Route} from 'react-router-dom';
import Schedule from "./componets/Views/Schedule/Schedule";
import DivisionLessons from "./componets/Views/TvDivisionLessons/DivisionLessons/DivisionLessons";
import Cabinets from "./componets/Views/Cabinets/Cabinets";
import DivisionLessonsFilter from "./componets/Views/TvDivisionLessons/DivisionLessonsFilter";
import NotFound from "./componets/Views/NotFound/NotFound";

function App() {

    return (
        <Routes>
            <Route path='/timetable'>
                <Route index element={<Filter/>}/>
                <Route path='group/:id' element={<Schedule mode="group"/>}/>
                <Route path='teacher/:id' element={<Schedule mode="teacher"/>}/>
                <Route path='cabinet/:id' element={<Cabinets/>}/>
                <Route path='divisions'>
                    <Route path='' element={<DivisionLessonsFilter/>}/>
                    <Route path=':id' element={<DivisionLessons/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default observer(App);
