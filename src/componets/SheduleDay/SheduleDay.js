import React from 'react';
import './sheduleDay.scss';
import { connect } from "react-redux";
import Lesson from '../Lesson/index';

const actionsCreators = {

}

const mapStatetoProps = (state) => {
  return { lessons: state.sheduleMode.lessons }
}

function SheduleDay(props) {
  const [infoLesson, setInfoLesson] = React.useState(null);

  const changeLesson = (lesson) => (e) => {
    e.preventDefault();
    setInfoLesson(lesson);
  }

  const { lessons } = props;


  const generateLessons = () => {
    const result = lessons.map((lesson) => {
      if (Array.isArray(lesson)) {
        return (<div className='lesson' onClick={changeLesson(lesson)} > 
          <Lesson mode="day" lesson={lesson[0]} subLesson={lesson[1]} key={lesson[0]._id} />
        </div>)
      }
      else {
        return (<div className='lesson' onClick={changeLesson(lesson)} >
          <Lesson mode="day" lesson={lesson} subLesson={null} key={lesson._id} onClick={changeLesson(lesson)} />
        </div>)
      }
    });

    return result;
  }


  return (
    <div className="shadow-container shedule-day col-10 p-0">
      <div className="content">

        <div className="couples">
          {generateLessons()}
        </div>
        <div className="info-section">
          <div className="board">
            {infoLesson === null ? "Выберите пару для просмотра" : (
              <div>
                <div className="name">{infoLesson.lessonNumber} ПАРА</div>
                <div className="text">
                  <span className="blue-color">Предмет:</span> {infoLesson.subject.name}
                </div>
                <div className="text">
                  <span className="blue-color">Преподаватель:</span> {infoLesson.teacher ? infoLesson.teacher.name : null}
                </div>
                <div className="text">
                  <span className="blue-color">Кабинет:</span> {infoLesson.cabinet ? infoLesson.cabinet.number : null}
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            )}
          </div>

          {/* <div className="dinner">
            <div className="icon-dinner"></div>
            <div className="title">- Разрываная пара с обедом с 10:50 по 11:10</div>
          </div> */}
        </div>
      </div>
    </div >
  );
}

const connSheduleDay = connect(mapStatetoProps, actionsCreators)(SheduleDay)
export default connSheduleDay;