import React from "react";
import "./app.scss";
import Filter from "./componets/Filter/Filter";
import schedule from "./store/scheduleStore";
import {observer} from "mobx-react-lite";
import filterStore from "./store/filterStore";
import {Routes, Route} from 'react-router-dom';
import Schedule from "./componets/Schedule";
import ScheduleByDivision from "./componets/ScheduleAllGroups/ScheduleByDivision";
import DivisionLessonsFilter from "./componets/Filter/DivisionLessonsFilter";

function App() {
    React.useEffect(() => {
        schedule.getCurrentWeek()
        filterStore.getDivisions()
        filterStore.getGroups()
    }, []);

    return (
        <Routes>
            <Route index element={<Filter/>}/>
            <Route path='/group/:id' element={<Schedule mode="group"/>}/>
            <Route path='/teacher/:id' element={<Schedule mode="teacher"/>}/>
            <Route path='/cabinet/:id' element={<ScheduleByDivision mode="cabs"/>}/>
            <Route path='tv'>
                <Route path='' element={<DivisionLessonsFilter/>}/>
                <Route path=':id' element={<ScheduleByDivision mode="allGroups"/>}/>
            </Route>
        </Routes>
    );
}

export default observer(App);
