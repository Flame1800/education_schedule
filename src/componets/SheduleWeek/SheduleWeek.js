import React from 'react';
import './sheduleWeek.scss';
import { connect } from "react-redux";
import _ from 'lodash';
import Lesson from '../Lesson/index';

const mapStatetoProps = (state) => {
  return { days: state.currWeek, lessons: state.currLessons };
}


function SheduleWeek(props) {
  return (
    <div className="shedule-week col-10 p-0">
      {props.days.map(day => {

        const dayLessons = _.sortBy(props.lessons.filter(lesson => lesson.date === day.fullDate), 'lessonNumber');

        return (
          <div className="container-day" key={day.day}>
            <div className="row-items">
              <div className="head">
                <div className="day-week">{day.weekDay}</div>
                <div className="min-cont">
                  <div className="btn-more"></div>
                  <div className="day">{day.day}</div>
                </div>
              </div>
              {dayLessons.length === 0 ? null : dayLessons.map((lesson, i) => {

                if (i !== dayLessons.length - 1) {
                  if (lesson.subgroup !== 0 && lesson.lessonNumber === dayLessons[i + 1].lessonNumber) {
                    return (<Lesson mode="week" lesson={lesson} subLesson={dayLessons[i + 1]} key={lesson._id} />)
                  }
                }
                else {
                console.log(lesson)

                  return (<Lesson mode="week" lesson={lesson} subLesson={null} key={lesson._id} />)
                }
              })}
            </div>
          </div>
        )
      })}

    </div >
  );
}

const connSheduleWeek = connect(mapStatetoProps, null)(SheduleWeek)
export default connSheduleWeek;