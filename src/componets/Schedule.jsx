import React, {useEffect} from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleDay from "./SheduleDay/SheduleDay";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import viewModeStore from "../store/viewModeStore";
import {observer} from "mobx-react-lite";
import filterStore from "../store/filterStore";
import {useParams} from "react-router-dom";
import schedule from "../store/scheduleStore";

const Schedule = ({mode}) => {
    const {id} = useParams()
    const {setLessonsByGroup, setLessonsByTeacher, currWeek} = schedule;
    const {view} = viewModeStore;
    const {setMode} = filterStore


    useEffect(() => {
        setMode(mode)
        const load = async () => {
            if (currWeek && mode === 'group') {
                await setLessonsByGroup(id)
            }
            if (currWeek && mode === 'teacher') {
                await setLessonsByTeacher(id)
            }
        }
        load()
    }, [currWeek, id, mode, setLessonsByGroup, setLessonsByTeacher, setMode])


    return (
        <>
            <Sidebar/>
            {view === "day" ? <ScheduleDay/> : <ScheduleWeek/>}
        </>
    );
};

export default observer(Schedule);
