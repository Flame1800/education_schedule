import React from 'react';
import './sheduleWeek.scss';
import { connect } from "react-redux";
import _ from 'lodash';
import Lesson from '../Lesson/index';
import * as actions from '../../actions/index';

const mapStatetoProps = (state) => {
  return { days: state.currWeek, lessons: state.currLessons, sheduleState: state.sheduleState };
}

const actionsCreators = {
  selectDay: actions.selectDay,
  changeMode: actions.changeMode,
}

function SheduleWeek(props) {

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
    const fLessons = filterLessons(dayLessons);

    const result = fLessons.map((lesson) => {

      if (Array.isArray(lesson)) {
        return (<div className='lesson' key={lesson[0]._id}>
          <Lesson mode="week" lesson={lesson[0]} subLesson={lesson[1]} key={lesson[0]._id} />
        </div>)
      }
      else {
        return (<div className='lesson' key={lesson._id}>
          <Lesson mode="week" lesson={lesson} subLesson={null} key={lesson._id} />
        </div>)
      }
    });

    return result;
  }

  const openDay = (day) => (e) => {
    e.preventDefault();
    props.changeMode();
    props.selectDay({ day });
  }

  if (props.sheduleState === 'loading') {
    return (
      <div className="App">
        <div className="main-container">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      </div>
    )
  }
  if (props.sheduleState === 'empty') {
    return (
      <div className="App">
        <div className="main-container">
          <div className="no-lessons"> Нет данных </div>
        </div>
      </div>
    )
  }

  return (
    <div className="shedule-week p-0">
      {props.days.map(day => {

        const dayLessons = _.sortBy(props.lessons.filter(lesson => lesson.date === day.fullDate), 'lessonNumber');

        return (
          <div className="container-day" key={day.day}>
            <div className="row-items">
              <div className="head">
                <div className="day-week">{day.weekDay}</div>
                <div className="min-cont">
                  <div className="cont-btn-more">
                    <div className="btn-more" onClick={openDay(day.fullDate)}></div>
                  </div>
                  <div className="day">{day.day}</div>
                </div>
              </div>
              {dayLessons.length === 0 ? (<div className="no-lessons"> Пар нет </div>) : generateLessons(dayLessons)}

            </div>
          </div>
        )
      })}

    </div >
  );
}

const connSheduleWeek = connect(mapStatetoProps, actionsCreators)(SheduleWeek)
export default connSheduleWeek;