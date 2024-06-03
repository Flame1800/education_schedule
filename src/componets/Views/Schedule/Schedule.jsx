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
import { QueryParams } from "use-query-params";

const Schedule = ({mode}) => {
    const {id} = useParams()
    const {setLessonsByGroup, setLessonsByTeacher, changeWeek} = schedule;
    const {view} = viewModeStore
    const [loading, setLoading] = useState(false)
    const [currLessons, setCurrLessons] = useState([])
    const [searchParams] = useSearchParams();
    

    const {setMode, getGroups} = filterStore

    const loadLessons = {
        'group': setLessonsByGroup(id),
        'teacher': setLessonsByTeacher(id)
    }

    useEffect(() => {
        (async () => {
            setMode(mode)
            changeWeek(searchParams.get('week'))
            try {
                setLoading(true)
                const fetchLessons = await loadLessons[mode]
                setCurrLessons(fetchLessons)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    useEffect(() => {
        getGroups()
    }, [])

    const loader = (
        <Wrapper>
            <CircularProgress color="inherit"/>
        </Wrapper>
    )

    // const queries = window.location.search.replace('?', '').split('&').map(v => v.split('='));
    // const talksIsNeedQuery = queries.find(v => v[0] === 'talksIsNeed')[0];

    // TODO: ДОДЕЛАТЬ НА БЭКЭ
    // const talksIsNeed = searchParams.get('talksIsNeed') === 'false' ? false  : true;
    const talksIsNeed = false;

    const scheduleContainer = view === 'day'
        ? <ScheduleDay talksIsNeed={talksIsNeed} lessons={currLessons}/>
        : <ScheduleWeek talksIsNeed={talksIsNeed} lessons={currLessons}/>

    return (
        <>
            {currLessons && <Sidebar lessons={currLessons}/>}
            {loading ? loader : scheduleContainer}
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
