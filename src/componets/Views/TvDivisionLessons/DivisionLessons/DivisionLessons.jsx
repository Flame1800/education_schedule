import React, {useEffect, useState} from 'react';
import './sheduleAllGroups.scss';
import {observer} from "mobx-react-lite";
import scheduleStore from "../../../../store/scheduleStore";
import 'swiper/swiper.scss';
import LessonsSlider from "./LessonsSlider";
import {useParams} from "react-router-dom";
import filterStore from "../../../../store/filterStore";
import {useSearchParams} from "react-router-dom";
import {EmptyLesson, ScheduleWrapper} from "./DivisionLessons.styled";
import datesStore from "../../../../store/datesStore";
import styled from "styled-components";
import { beautyDate } from '../../../../lib/beautyDate';
import weekModeViews from '../../../../consts/weekModeViews';

function DivisionLessons() {
    console.log(datesStore)
    const {getDayLessons, changeWeek} = scheduleStore
    const [dayLessons, setDayLessons] = useState([])
    const [loading, setLoading] = useState(false)

    const {id} = useParams()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                filterStore.setMode('group')
                changeWeek(weekModeViews.curr)
                const lessons = await getDayLessons(id)

                setDayLessons(lessons ? lessons : [])

            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }

        })()
    }, [changeWeek, getDayLessons, id, searchParams])

    const zoom = searchParams.get('zoom')
    const firstHalf = dayLessons.filter((_, i) => i <= dayLessons.length / 2)
    const secondHalf = dayLessons.filter((_, i) => i >= dayLessons.length / 2)


    if (dayLessons.length === 0) {
        return (
            <ScheduleWrapper>
                <EmptyLesson>
                    {!loading ? "Нет пар" : "Загрузка"}
                </EmptyLesson>
            </ScheduleWrapper>
        )
    }

    return (
        <div className='container-all' style={{zoom: zoom ? zoom : 1}}>
            {dayLessons.length > 0 && <LessonsSlider lessons={firstHalf}/>}
            {dayLessons.length > 0 && <LessonsSlider lessons={secondHalf} pagination={true}/>}
            <Date>{beautyDate(datesStore.currDay)}</Date>
        </div>
    );
}

const Date = styled.div`
  font-weight: 600;
  color: #858585;
  font-size: 20px;
  width: 100%;
  padding-left: 5px;
`


export default observer(DivisionLessons);
