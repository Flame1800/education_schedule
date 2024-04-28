import React, { useEffect } from "react";
import "./sheduleWeek.scss";
import fillEmptyLessons from "../../../../lib/fillEmptyLessons";
import { observer } from "mobx-react-lite";
import datesStore from "../../../../store/datesStore";
import viewModeStore from "../../../../store/viewModeStore";
import sortLessons from "../../../../lib/sortLessonsByNumber";
import WeekLesson from "../../../Lesson/WeekLesson/WeekLesson";
import IconMore from "../../../../assets/img/arrows-expand-right.png";
import {
  Button,
  DayLesson,
  DayLessonsWrapper,
  DayMonth,
  Header,
  Lessons,
  Main,
  Meta,
  ScheduleWrapper,
} from "./ScheduleWeek.style";
import StateTitle from "../../../Common/NoLessonsTitle";
import TalksPromoInfo from "../../../Lesson/WeekLesson/TalksPromoInfo";

function ScheduleWeek({ lessons }) {
  const { setDay, datesWeek, getDatesWeek } = datesStore;
  const { setView } = viewModeStore;

  useEffect(() => {
    (async () => {
      await getDatesWeek();
    })();
  }, [getDatesWeek]);

  const generateLessons = (dayLessons, day) => {
    const fLessons = fillEmptyLessons(dayLessons, day);
    return fLessons.map((lesson) => {
      const isMonday = day.weekday === 1;
      const tempLesson = Array.isArray(lesson) ? lesson[0] : lesson;
      const isTalks =
        tempLesson.lessonNumber === 1 || tempLesson.lessonNumber === 4;

      return (
        <>
          {isTalks && isMonday && <TalksPromoInfo pair={lesson.lessonNumber} />}
          <WeekLesson key={lesson._id} day={day} lesson={lesson} />
        </>
      );
    });
  };

  const changeViewHandle = (date) => {
    setDay(date.toISODate());
    setView("day");
  };

  return (
    <ScheduleWrapper>
      {datesWeek.map((day) => {
        const dayLessons = sortLessons(
          lessons.filter((lesson) => lesson.date === day.toISODate())
        );
        const dayLessonsComponent =
          dayLessons.length === 0 ? (
            <StateTitle>Пар нет</StateTitle>
          ) : (
            generateLessons(dayLessons, day)
          );

        return (
          // DayLessonsWrapper max width = 1560px
          <DayLessonsWrapper key={day.day}>
            <Main>
              <Header>
                <DayLesson>{day.toFormat("EEEE")}</DayLesson>
                <Meta>
                  <DayMonth>{day.toFormat("d LLL")}</DayMonth>
                  <Button onClick={() => changeViewHandle(day)}>
                    <img src={IconMore} alt="раскрыть" />
                  </Button>
                </Meta>
              </Header>
              <Lessons>{dayLessonsComponent}</Lessons>
            </Main>
          </DayLessonsWrapper>
        );
      })}
    </ScheduleWrapper>
  );
}

export default observer(ScheduleWeek);
