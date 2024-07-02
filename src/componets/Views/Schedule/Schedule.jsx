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
// import Loader from "../../Loader/Loader.jsx";

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

    const [isLoading, setLoading] = useState(true);
    // #endregion

    // #region changing week and setting lessons
    useEffect(() => {
        (async () => {
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

            // mode is group, teacher
            setMode(mode);

            try {
                let fetchLessons = [];

                switch(mode) {
                    case 'group': 
                        fetchLessons = await setLessonsByGroup(id);
                        break;
                    case 'teacher':
                        fetchLessons = await setLessonsByTeacher(id);
                }

                setCurrLessons(fetchLessons);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            controller.abort();
        };
    }, [id]);
    // #endregion

    // #region getting groups from filterStore
    useEffect(() => {
        getGroups();
    }, [getGroups]);
    // #endregion

    // #region declaration of loader
    const loader = (
        <Wrapper>
            {/* TODO: сделать лоадер */}
        </Wrapper>
    );
    // #endregion

    // #region declaration of container by mode (day, week)
    const scheduleContainer = 
        view === "day" ? (
            <ScheduleDay lessons={currLessons} />
        ) : (
            <ScheduleWeek lessons={currLessons} />
        );
    //  #endregion

    return (
        <>
            {!isLoading && <Sidebar lessons={currLessons} />}

            {isLoading ? loader : scheduleContainer}
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
