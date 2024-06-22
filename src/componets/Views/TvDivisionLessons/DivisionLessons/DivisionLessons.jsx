import React, { useEffect, useState } from 'react';
import './sheduleAllGroups.scss';
import { observer } from "mobx-react-lite";
import scheduleStore from "../../../../store/scheduleStore";
import 'swiper/swiper.scss';
import LessonsSlider from "./LessonsSlider";
import { useParams } from "react-router-dom";
import filterStore from "../../../../store/filterStore";
import { useSearchParams } from "react-router-dom";
import { EmptyLesson, ScheduleWrapper } from "./DivisionLessons.styled";
import datesStore from "../../../../store/datesStore";
import styled from "styled-components";
import { beautyDate } from '../../../../lib/beautyDate';
import weekModeViews from '../../../../consts/weekModeViews';
import CurrentTime from "./CurrentTime";


function DivisionLessons() {
    const timeInHours = CurrentTime();
    const { getDayLessons, changeWeek } = scheduleStore
    const [dayLessons, setDayLessons] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const flagShift = (timeInHours.props.children > '13:00') ? 2 : 1;

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

    if (dayLessons.length === 0) {
        return (
            <ScheduleWrapper>
                <EmptyLesson>
                    {!loading ? "Нет пар" : "Загрузка"}
                </EmptyLesson>
            </ScheduleWrapper>
        )
    }
 
    if (dayLessons.length <= 6) {
        return (
            <div className='container-all' style={{ zoom: zoom ? zoom : 1 }}>
                {dayLessons.length > 0 && <LessonsSlider lessons={dayLessons} />}
            </div>
        );
    }

    let oneShiftArr = [];

    for (let i = 0; i < dayLessons.length; i++) {
        if (dayLessons[i][1].length >= 3) {
            if (dayLessons[i][1][0].lessonNumber === 3) {
                oneShiftArr.push(dayLessons[i])
            }
        }
        if (dayLessons[i][1][0].lessonNumber === 1 || dayLessons[i][1][1].lessonNumber === 2) {
            oneShiftArr.push(dayLessons[i])
        }
    }

    let twoShiftArr = [];

    for (let i = 0; i < dayLessons.length; i++) {
        if (dayLessons[i][1][0].lessonNumber === 3 && dayLessons[i][1][1].lessonNumber === 4) {
            twoShiftArr.push(dayLessons[i])
        }
        if (dayLessons[i][1][0].lessonNumber === 4 || dayLessons[i][1][1].lessonNumber === 5 || dayLessons[i][1][0].lessonNumber === 5) {
            twoShiftArr.push(dayLessons[i])
        }
    }

    const ChangeShift = (arr) => {
        let unique = arr.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        })
        return unique;
    }

    setInterval(() => {
        window.location.reload();
    }, 500000);

    return (
        <div className='container-all' style={{ zoom: zoom ? zoom : 1 }}>
            {ChangeShift(flagShift == 1 ? oneShiftArr : twoShiftArr).length > 0 && <LessonsSlider lessons={ChangeShift(flagShift == 1 ? oneShiftArr : twoShiftArr)} />}
        </div>
    );
}

export default observer(DivisionLessons);
