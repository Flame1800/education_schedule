import React from 'react';
import './sheduleDay.scss';
import { connect } from "react-redux";
import Lesson from '../Lesson/index';
import NawWeek from '../NawWeek/index';
import _ from 'lodash';


const actionsCreators = {

}

const mapStatetoProps = (state) => {
  return { lessons: state.currLessons, currDay: state.selectedDay }
}

function SheduleDay(props) {

  const { lessons, currDay } = props;

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

  const dayLessonsF = _.sortBy(lessons.filter(lesson => lesson.date === currDay), 'lessonNumber');

  const generateLessons = () => {

    const dayLessons = filterLessons(dayLessonsF);

    const result = dayLessons.map((lesson) => {
      if (Array.isArray(lesson)) {
        return (<div className='lesson' key={lesson[0]._id}>
          <Lesson mode="day" lesson={lesson[0]} subLesson={lesson[1]}  />
        </div>)
      }
      else {
        return (<div className='lesson' key={lesson._id}>
          <Lesson mode="day" lesson={lesson} subLesson={null} />
        </div>)
      }
    });

    return result;
  }


  return (
    <div className="shadow-container shedule-day col-10 p-0">
      <NawWeek />
      <div className="sheldue-day-cont main-cont">
        {dayLessonsF.length !== 0 ? (
          <div className="content">
            <div className="couples">
              {generateLessons()}
            </div>
          </div>
        ) : (<div className="no-lessons"> Пар нет </div>)}

      </div>
    </div >
  );
}

const connSheduleDay = connect(mapStatetoProps, actionsCreators)(SheduleDay)
export default connSheduleDay;