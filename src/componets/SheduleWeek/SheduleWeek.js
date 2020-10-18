import React from 'react';
import './sheduleWeek.scss';
import { connect } from "react-redux";
import _ from 'lodash';
import Lesson from '../Lesson/index';

const mapStatetoProps = (state) => {
  return { days: state.currWeek, lessons: state.currLessons };
}


function SheduleWeek(props) {


  const generateLessons = (dayLessons) => {
    console.log(dayLessons[0].date);

    const mappingLessons = [];
    // let lessonPoint = 0;

    // for (let i = 1; i < dayLessons.length; i++) {
    //   const lesson = dayLessons[i];
    //   console.log(mappingLessons[i]);

    //   if (lesson.lessonNumber !== i && mappingLessons[i] !== undefined) {
    //     console.log(lesson.lessonNumber, i);
    //     mappingLessons[i] = { mode: 'empty' };
    //     i--;
    //   } else {
    //     mappingLessons[i] =  lesson;
    //   }
    // }

    console.log(mappingLessons);

    const result = dayLessons.map((lesson, i) => {

      if (dayLessons[i + 1] !== undefined) {
        if (lesson.lessonNumber === dayLessons[i + 1].lessonNumber) {
          return (<Lesson mode="week" lesson={lesson} subLesson={dayLessons[i + 1]} key={lesson._id} />)
        }
      }
      if (dayLessons[i - 1] !== undefined) {
        if (lesson.subgroup === 2 && lesson.lessonNumber === dayLessons[i - 1].lessonNumber) {
          return null;
        }
      }

      return (<Lesson mode="week" lesson={lesson} subLesson={null} key={lesson._id} />)
    });

    return result;
  }

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
              {dayLessons.length === 0 ? null : generateLessons(dayLessons)}

            </div>
          </div>
        )
      })}

    </div >
  );
}

const connSheduleWeek = connect(mapStatetoProps, null)(SheduleWeek)
export default connSheduleWeek;