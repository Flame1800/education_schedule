import React from "react";
import "./app.scss";
import Filter from "./componets/Views/Filter/Filter";
import schedule from "./store/scheduleStore";
import {observer} from "mobx-react-lite";
import filterStore from "./store/filterStore";
import {Routes, Route} from 'react-router-dom';
import Schedule from "./componets/Views/Schedule/Schedule";
import DivisionLessons from "./componets/Views/TvDivisionLessons/DivisionLessons/DivisionLessons";
import Cabinets from "./componets/Views/Cabinets/Cabinets";
import DivisionLessonsFilter from "./componets/Views/TvDivisionLessons/DivisionLessonsFilter";

function App() {
    React.useEffect(() => {
        schedule.getCurrentWeek()
        filterStore.getDivisions()
        filterStore.getGroups()
    }, []);


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
        </Routes>
    );
}

export default observer(App);
