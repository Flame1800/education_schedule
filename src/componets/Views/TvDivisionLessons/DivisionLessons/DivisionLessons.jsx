import React, {useEffect, useRef, useState} from 'react';
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

function DivisionLessons() {
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
                changeWeek(searchParams.get('week'))
                const lessons = await getDayLessons(id)
                setDayLessons(lessons ? lessons : [])
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }

        })()
    }, [])

    const tv = searchParams.get('tv')
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
        <div className='container-all' style={{zoom: tv === 'ture' ? `0.86` : '1'}}>
            {dayLessons.length > 0 && <LessonsSlider lessons={firstHalf}/>}
            {dayLessons.length > 0 && <LessonsSlider lessons={secondHalf} pagination={true}/>}
            <Date>{datesStore.currDay}</Date>
        </div>
    );
}

const Date = styled.div`
  bottom: 40px;
  font-weight: 600;
  color: #858585;
  font-size: 20px;
  width: 100%;
  margin-top: -40px;
  padding-left: 5px;
`


export default observer(DivisionLessons);