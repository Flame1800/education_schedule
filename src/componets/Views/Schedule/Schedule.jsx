import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ScheduleWeek from "./SheduleWeek/SheduleWeek";
import { observer } from "mobx-react-lite";
import filterStore from "../../../store/filterStore";
import { useParams, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import viewModeStore from "../../../store/viewModeStore";
import ScheduleDay from "./SheduleDay/SheduleDay";
import scheduleStore from "../../../store/scheduleStore";

const Schedule = ({ mode }) => {
    // #region declaration of constants
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const { setLessonsByGroup, setLessonsByTeacher, changeDate } =
        scheduleStore;
    const { setMode, getGroups } = filterStore;

    const { view } = viewModeStore;
    const [loading, setLoading] = useState(false);
    const [currLessons, setCurrLessons] = useState([]);
    // #endregion

    // #region loading lessons
    const loadLessons = {
        group: setLessonsByGroup(id),
        teacher: setLessonsByTeacher(id),
    };
    // #endregion

    // #region changing week and setting lessons
    useEffect(() => {
        (async () => {
            // mode is group, teacher, allGroups
            setMode(mode);

            const date = searchParams.get("week");

            changeDate(date);

            try {
                setLoading(true);
                const fetchLessons = await loadLessons[mode];
                setCurrLessons(fetchLessons);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);
    // #endregion

    // #region getting groups from filterStore
    useEffect(() => {
        getGroups();
    }, []);
    // #endregion

    // #region declaration of loader
    const loader = (
        <Wrapper>
            <CircularProgress color="inherit" />
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
            {currLessons && <Sidebar lessons={currLessons} />}
            {loading ? loader : scheduleContainer}
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
