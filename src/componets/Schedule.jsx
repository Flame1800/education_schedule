import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleDay from "./SheduleDay/SheduleDay";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import viewModeStore from "../store/viewModeStore";
import {observer} from "mobx-react-lite";
import filterStore from "../store/filterStore";
import ScheduleAllGroups from "./ScheduleAllGroups/ScheduleAllGroups";

const Schedule = () => {
    const {view} = viewModeStore;
    const {mode} = filterStore
    const scheduleComponent = view === "day" ? <ScheduleDay/> : <ScheduleWeek/>;


    return (
        <>
            <Sidebar/>
            {mode === "allGroups" ? <ScheduleAllGroups/> : scheduleComponent}
        </>
    );
};

export default observer(Schedule);
