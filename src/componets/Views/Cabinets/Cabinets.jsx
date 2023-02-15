import React, {useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from "react-router-dom";
import NawWeek from "../../NawWeek/NawWeek";
import filterLessons from "../../../lib/fillEmptyLessons";
import WeekLesson from "../../Lesson/WeekLesson/WeekLesson";
import scheduleStore from "../../../store/scheduleStore";
import {observer} from "mobx-react-lite";
import datesStore from "../../../store/datesStore";
import sortArr from "../../../lib/sortArr";
import filterStore from "../../../store/filterStore";

const Cabinets = () => {
    const {getLessonsForCabinets, changeWeek} = scheduleStore
    const [lessons, setLessons] = React.useState([])
    const [loading, setLoading] = useState(false)

    const {currDay} = datesStore
    const {id} = useParams()
    const [searchParams] = useSearchParams();

    const {setMode} = filterStore


    useEffect(() => {
        (async () => {
            setMode('cabinet')
            setLoading(true)
            try {
                changeWeek(searchParams.get('week'))
                const fetchLessons = await getLessonsForCabinets(id)
                setLessons(fetchLessons)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }

        })()
    }, [currDay, setMode, changeWeek])


    return (
        <div className='container-all'>
            <Link to="/timetable">
                <div className="back-btn">Назад</div>
            </Link>
            <div className="schedule-all">
                <div className="cabs">
                    <NawWeek/>
                    {lessons.length === 0 &&
                        <div className='empty-lesson'>
                            {loading ? "Загрузка..." : "Нет пар"}
                        </div>
                    }
                    {lessons.length !== 0 && <div className="cab-items">
                        {sortArr(lessons).map(pair => {
                            const [groupName, lessons] = pair
                            const groupNameMapped = groupName === "undefined" ? "***" : groupName

                            return (
                                <div className="container-day" key={groupName}>
                                    <div className="row-items">
                                        <div className="head">
                                            <div className="group">{groupNameMapped}</div>
                                        </div>
                                        <div className="lesson-cont">
                                            {filterLessons(lessons).map((lesson, i) => {
                                                return <WeekLesson key={i} lesson={lesson}/>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default observer(Cabinets);