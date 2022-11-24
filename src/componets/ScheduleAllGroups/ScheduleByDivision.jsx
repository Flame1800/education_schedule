import React, {useEffect} from 'react';
import scheduleStore from "../../store/scheduleStore";
import {useParams} from "react-router-dom";
import ScheduleAllGroups from "./ScheduleAllGroups";
import filterStore from "../../store/filterStore";
import {observer} from "mobx-react-lite";

const ScheduleByDivision = ({mode}) => {
    const {loading, setLessonsByDivision, currLessons} = scheduleStore
    const {id} = useParams()

    useEffect(() => {
        filterStore.setMode(mode)
        setLessonsByDivision(id)
    }, [mode, id])

    if (loading) {
        return <div className="state-banner">Загрузка...</div>
    }


    if (currLessons.length === 0 && !loading) {
        return <div className="state-banner">Нет пар</div>
    }


    return <ScheduleAllGroups/>;
};

export default observer(ScheduleByDivision);