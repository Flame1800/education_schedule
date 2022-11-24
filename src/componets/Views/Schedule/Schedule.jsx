import React, {useEffect} from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleDay from "./SheduleDay/SheduleDay";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import viewModeStore from "../../../store/viewModeStore";
import {observer} from "mobx-react-lite";
import filterStore from "../../../store/filterStore";
import {useParams} from "react-router-dom";
import schedule from "../../../store/scheduleStore";

const Schedule = ({mode}) => {
    const {id} = useParams()
    const {setLessonsByGroup, setLessonsByTeacher} = schedule;
    const {view} = viewModeStore;
    const {setMode} = filterStore


    useEffect(() => {
        setMode(mode)
        const load = async () => {
            if (mode === 'group') {
                await setLessonsByGroup(id)
            }
            if (mode === 'teacher') {
                await setLessonsByTeacher(id)
            }
        }
        load()
    }, [])


    return (
        <>
            <Sidebar/>
            {view === "day" ? <ScheduleDay/> : <ScheduleWeek/>}
        </>
    );
};

export default observer(Schedule);
