import React, {useEffect} from 'react';
import './sheduleWeek.scss';
import filterLessons from "../../../../lib/fillEmptyLessons";
import {observer} from "mobx-react-lite";
import datesStore from "../../../../store/datesStore";
import viewModeStore from "../../../../store/viewModeStore";
import sortLessons from "../../../../lib/sortLessonsByNumber";
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import IconMore from "../../../../assets/img/arrows-expand-right.png"
import {
    Button, DayLesson,
    DayLessonsWrapper,
    DayMonth,
    Header,
    Lessons,
    Main,
    Meta, ScheduleWrapper
} from "./ScheduleWeek.style";
import StateTitle from "../../../Common/NoLessonsTitle";


function ScheduleWeek({lessons}) {
    const {setDay, datesWeek, getDatesWeek} = datesStore
    const {setView} = viewModeStore

    useEffect(() => {
        (async () => {
            await getDatesWeek()
        })()
    }, [])

    const generateLessons = (dayLessons) => {
        const fLessons = filterLessons(dayLessons);
        return fLessons.map((lesson) => <WeekLesson key={lesson._id} lesson={lesson}/>);
    }

    const changeViewHandle = (date) => {
        setDay(date.toISODate())
        setView('day')
    }


    return (
        <ScheduleWrapper>
            {datesWeek.map(day => {
                const dayLessons = sortLessons(lessons.filter(lesson => lesson.date === day.toISODate()));
                const dayLessonsComponent = dayLessons.length === 0
                    ? <StateTitle>Пар нет</StateTitle>
                    : generateLessons(dayLessons)

                return (
                    // DayLessonsWrapper max width = 1560px
                    <DayLessonsWrapper key={day.day}>
                        <Main>
                            <Header>
                                <DayLesson>{day.toFormat('EEEE')}</DayLesson>
                                <Meta>
                                    <DayMonth>{day.toFormat("d LLL")}</DayMonth>
                                    <Button onClick={(() => changeViewHandle(day))}>
                                        <img src={IconMore} alt="раскрыть"/>
                                    </Button>
                                </Meta>
                            </Header>
                            <Lessons>
                                {dayLessonsComponent}
                            </Lessons>
                        </Main>
                    </DayLessonsWrapper>
                )
            })}
        </ScheduleWrapper>
    );

}

export default observer(ScheduleWeek);