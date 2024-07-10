import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import { observer } from "mobx-react-lite";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ScheduleDay from "./SheduleDay/SheduleDay";
import { getWeek } from "../../../lib/API";
import {
    datesStore,
    weekStore,
    scheduleStore,
    filterStore,
    viewModeStore,
} from "../../../store";
import { DateTime } from "luxon";
import CircularLoader from "../../CircularLoader/CircularLoader";

const Schedule = ({ mode }) => {
    console.log("настоящий мастер - вечный ученик");
    // #region declaration of constants
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const { setLessonsByGroup, setLessonsByTeacher } = scheduleStore;
    const { setDate, setWeek } = weekStore;
    const { setMode, getGroups, getDivisions } = filterStore;
    const { setDay } = datesStore;

    const { view } = viewModeStore;
    const [currLessons, setCurrLessons] = useState([]);

    const controller = new AbortController();

    const [isLoading, setLoading] = useState(false);
    // #endregion

    const settingStates = async () => {
        setLoading(true)

        await getDivisions();
        await getGroups();

        const dateISO = searchParams.get("week");

        let date = DateTime.fromISO(dateISO);

        if (date.weekday === 7) {
            date = date.plus({
                day: 1,
            });
        }

        setDate(date);
        date = date.toISODate();
        setDay(date);

        const week = await getWeek(date);
        setWeek(week);

        // the mode can be a group and a teacher
        setMode(mode);

        try {
            let fetchLessons = [];

            switch(mode) {
                case 'group': 
                    fetchLessons = await setLessonsByGroup(id);
                    break;
                case 'teacher':
                    fetchLessons = await setLessonsByTeacher(id);
                    break;
                default:
                    fetchLessons = [];
            }

            setCurrLessons(fetchLessons);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    // changing week and setting lessons
    useEffect(() => {
        settingStates();

        return () => {
            controller.abort();
        };
    }, [id]);

    // getting groups from filterStore
    useEffect(() => {
        getGroups();
    }, [getGroups]);

    // declaration of loader
    const loader = (
        <Wrapper>
            <CircularLoader className="h-24" />
        </Wrapper>
    );

    // const queries = window.location.search.replace('?', '').split('&').map(v => v.split('='));
    // const talksIsNeedQuery = queries.find(v => v[0] === 'talksIsNeed')[0];

    // TODO: ДОДЕЛАТЬ НА БЭКЭ
    // const talksIsNeed = searchParams.get('talksIsNeed') === 'false' ? false  : true;
    const talksIsNeed = false;

    const scheduleContainer = view === 'day'
        ? <ScheduleDay talksIsNeed={talksIsNeed} lessons={currLessons}/>
        : <ScheduleWeek talksIsNeed={talksIsNeed} lessons={currLessons}/>

    const component = (
        <>
            <Sidebar lessons={currLessons} />
            {scheduleContainer}
        </>
    )

    return (
        <>
            {isLoading ? loader : component}
        </>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
`;

export default observer(Schedule);
