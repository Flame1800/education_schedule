import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import {observer} from "mobx-react-lite";
import filterStore from "../../../store/filterStore";
import {useParams, useSearchParams} from "react-router-dom";
import schedule from "../../../store/scheduleStore";
import {CircularProgress} from "@mui/material";
import styled from "styled-components";
import viewModeStore from "../../../store/viewModeStore";
import ScheduleDay from "./SheduleDay/SheduleDay";

const Schedule = ({mode}) => {
    const {id} = useParams()
    const {setLessonsByGroup, setLessonsByTeacher, changeWeek} = schedule;
    const {view} = viewModeStore
    const [currLessons, setCurrLessons] = useState([])
    const [searchParams] = useSearchParams();

    const {setMode} = filterStore

    const loadLessons = {
        'group': setLessonsByGroup(id),
        'teacher': setLessonsByTeacher(id)
    }

    useEffect(() => {
        (async () => {
            setMode(mode)
            changeWeek(searchParams.get('week'))
            const fetchLessons = await loadLessons[mode]
            setCurrLessons(fetchLessons)
        })()
    }, [id])

    const loader = (
        <Wrapper>
            <CircularProgress color="inherit"/>
        </Wrapper>
    )

    const scheduleContainer = view === 'day'
        ? <ScheduleDay lessons={currLessons}/>
        : <ScheduleWeek lessons={currLessons}/>

    return (
        <>
            {currLessons && <Sidebar lessons={currLessons}/>}
            {currLessons.length === 0 ? loader : scheduleContainer}
        </>
    )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`


export default observer(Schedule);
