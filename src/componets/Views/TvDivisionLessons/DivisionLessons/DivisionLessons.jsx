import React, {useEffect, useState} from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../../../store/scheduleStore";
import 'swiper/swiper.scss';
import LessonsSlider from "./LessonsSlider";
import {useParams} from "react-router-dom";

function DivisionLessons() {
    const {getDayLessons, loading} = scheduleStore
    const [dayLessons, setDayLessons] = useState([])
    const {id} = useParams()

    useEffect(() => {
        (async () => {
            const lessons = await getDayLessons(id)
            setDayLessons(lessons)
        })()
    }, [])

    const firstHalf = dayLessons.filter((_, i) => i <= dayLessons.length / 2)
    const secondHalf = dayLessons.filter((_, i) => i >= dayLessons.length / 2)

    if (loading) {
        return (
            <div className='schedule-all'>
                <div className='empty-lesson'>
                    Загрузка
                </div>
            </div>
        )
    }

    if (!loading && dayLessons.length === 0) {
        return (
            <div className='schedule-all'>
                <div className='empty-lesson'>
                    Нет пар
                </div>
            </div>
        )
    }

    return (
        <div className='container-all'>
            {firstHalf.length > 0 && <LessonsSlider lessons={firstHalf}/>}
            {secondHalf.length > 0 && <LessonsSlider lessons={secondHalf} pagination={true}/>}
        </div>
    );
}

export default observer(DivisionLessons);