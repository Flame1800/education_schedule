import React from "react";
import "./sheduleDay.scss";
import { observer } from "mobx-react-lite";
import NavWeek from "../../../NawWeek/NawWeek";
import datesStore from "../../../../store/datesStore";
import DayLesson from "../../../Lesson/DayLesson/DayLesson";
import { Lessons, Main, ScheduleWrapper } from "./ScheduleDay.style";
import NoLessonsTitle from "../../../Common/NoLessonsTitle";
import fillEmptyLessons from "../../../../lib/fillEmptyLessons";
import { DateTime } from "luxon";
import TalksPromoInfo from "../../../Lesson/WeekLesson/TalksPromoInfo";

function ScheduleDay({ lessons }) {
  const { currDay } = datesStore;

  const filterLessonsByDay = (lessons) =>
    lessons.filter((lesson) => lesson.date === currDay);
  const dayLessons = filterLessonsByDay(lessons);

  return (
    <ScheduleWrapper>
      {lessons.length !== 0 && <NavWeek />}
      <Main>
        <Lessons>
          {dayLessons.length === 0 ? (
            <NoLessonsTitle>Нет пар</NoLessonsTitle>
          ) : (
            fillEmptyLessons(dayLessons, DateTime.fromISO(currDay)).map(
              (lesson, i) => {
                const isDouble = Array.isArray(lesson);
                const tempLesson = isDouble ? lesson[0] : lesson;

                const isMonday = DateTime.fromISO(currDay).weekday === 1;
                const isTalks =
                  tempLesson.lessonNumber === 1 ||
                  tempLesson.lessonNumber === 4;

                return (
                  <>
                    {isTalks && isMonday && (
                      <TalksPromoInfo rounded pair={tempLesson.lessonNumber} />
                    )}
                    <DayLesson key={i} lesson={lesson} />
                  </>
                );
              }
            )
          )}
        </Lessons>
      </Main>
    </ScheduleWrapper>
  );
}

export default observer(ScheduleDay);
