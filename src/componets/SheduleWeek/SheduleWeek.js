import React from 'react';
import './sheduleWeek.scss';
import { connect } from "react-redux";
import _ from 'lodash';
import Lesson from '../Lesson/index';
import * as actions from '../../actions';
import { DateTime } from 'luxon';

const mapStatetoProps = (state) => {
  return { days: state.currWeek, lessons: state.currLessons };
}

const actionCreators = {
  changeMode: actions.changeMode,
}

function SheduleWeek(props) {

  let { year, month, day } = DateTime.local();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  const currDate = `${year}-${month}-${day}`;

  const filterLessons = (dayLessons) => {

    const newLessons = [];
    const numbers = dayLessons.map(lesson => lesson.lessonNumber);

    const findLesson = (num, lessons) => {
      const currLessons = lessons.filter(lesson => lesson.lessonNumber === num);

      if (currLessons.length === 1) {
        return currLessons[0];
      }
      if (currLessons.length > 1) {
        return currLessons;
      }

      return { subject: { name: "Нет пары" }, lessonNumber: num, _id: _.uniqueId() };
    }

    for (let i = 1; i <= numbers[numbers.length - 1]; i++) {
      newLessons.push(findLesson(i, dayLessons));
    }

    return newLessons;
  }

  const generateLessons = (dayLessons) => {

    const filteredLessons = filterLessons(dayLessons);

    const result = filteredLessons.map((lesson, i) => {
      if (Array.isArray(lesson)) {
        return (<Lesson mode="week" lesson={lesson[0]} subLesson={lesson[1]} key={lesson[0]._id} />)
      }
      else {
        return (<Lesson mode="week" lesson={lesson} subLesson={null} key={lesson._id} />)
      }
    });

    return result;
  }

  const openSheduleDay = (dayLessons) => (e) => {
    e.preventDefault();
    props.changeMode({ mode: 'day', lessons: filterLessons(dayLessons) });
  }

  return (
    <div className="shedule-week col-10 p-0">
      {props.days.map(day => {

        const dayLessons = _.sortBy(props.lessons.filter(lesson => lesson.date === day.fullDate), 'lessonNumber');

        return (
          <div className="container-day" key={day.day}>
            <div className="row-items">
              <div className="head">
                <div className="main-cont">
                  {day.fullDate === currDate && <div className="today">Cегодня</div>}
                  <div className="day-week">{day.weekDay}</div>
                </div>
                <div className="min-cont">
                  <div className="cont-btn-more">
                    <div className="btn-more" onClick={openSheduleDay(dayLessons)}></div>
                  </div>
                  <div className="day">{day.day}</div>
                </div>
              </div>
              {dayLessons.length === 0 ? null : generateLessons(dayLessons)}
            </div>
          </div>
        )
      })}

    </div >
  );
}

const connSheduleWeek = connect(mapStatetoProps, actionCreators)(SheduleWeek)
export default connSheduleWeek;