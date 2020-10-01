import React from 'react';
import './sheduleDay.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';


const actionsCreators = {

}

const mapStatetoProps = (state) => {
  return { lessons: state.currLessons }
}


function SheduleDay(props) {
  const [infoLesson, setInfoLesson] = React.useState(null);

  const changeLesson = (lesson) => (e) => {
    e.preventDefault();
    setInfoLesson(lesson);
  }

  return (
    <div className="shadow-container col-10 p-0">
      <div className="content">

        <div className="couples">
          {props.lessons.length === 0 ? "Пар нет" : props.lessons.map((lesson, i) => {
            if (lesson.subgroup !== 0 && lesson.lessonNumber === props.lessons[i + 1].lessonNumber) {
              return (
                <div className="item" key={lesson._id} onClick={changeLesson(lesson)}>
                  <div className="num">{lesson.lessonNumber}</div>
                  <div className="couple">
                    <div className="sub-item">
                      <div className="head-card">
                        <div className="name">{lesson.teacher.abb_name}</div>
                        <div className="cont">
                          <div className="sign">{lesson.subgroup}</div>
                          <div className="cab">{lesson.cabinet.number} каб</div>
                        </div>
                      </div>
                    </div>
                    <div className="sub-item">
                      <div className="head-card">
                        <div className="name">{props.lessons[i + 1].teacher.abb_name}</div>
                        <div className="cont">
                          <div className="sign">{props.lessons[i + 1].subgroup}</div>
                          <div className="cab">{props.lessons[i + 1].cabinet.number} каб</div>
                        </div>
                      </div>
                      {/* <div className="time">00:00 - 00:00</div> */}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div className="item" key={lesson._id} onClick={changeLesson(lesson)}>
                <div className="num">{lesson.lessonNumber}</div>
                <div className="couple one-couple">
                  <div className="head-card">
                    <div className="name">{lesson.teacher.abb_name}</div>

                    <div className="cont">
                      {lesson.subgroup !== 0 ? <div className="sign">{lesson.subgroup}</div> : null}
                      <div className="cab">{lesson.cabinet.number} каб</div>
                      {/* <div className="icon-dinner"></div> */}
                    </div>
                  </div>
                  {/* <div className="time">00:00 - 00:00</div> */}
                </div>
              </div>
            )

          })}

          {/* <div className="item active-item">
            <div className="num">2</div>
            <div className="couple one-couple">
              <div className="head-card">
                <div className="name">ОГСЭ.06 Осн.дел.комм Лепина К.А</div>

                <div className="cont">
                  <div className="cab">32 каб</div>
                  <div className="icon-dinner"></div>
                </div>
              </div>
              <div className="time">08:10 - 09:20</div>
            </div>
          </div>
          <div className="item">
            <div className="num">3</div>
            <div className="couple  one-couple">
              <div className="head-card">
                <div className="name">ОП.03 Техн. механика Высоцкая Л.В</div>
                <div className="cab">33 каб</div>
              </div>
              <div className="time">09:40 - 10:20</div>
            </div>
          </div> */}
        </div>
        <div className="info-section">
          <div className="board">
            {infoLesson === null ? "Выберите пару для просмотра" : (
              <div>
                <div className="name">{infoLesson.lessonNumber} ПАРА</div>
                <div className="text">
                  <span className="blue-color">Предмет:</span> {infoLesson.cabinet.name}
                </div>
                <div className="text">
                  <span className="blue-color">Преподаватель:</span> {infoLesson.teacher.name}
                </div>
                <div className="text">
                  <span className="blue-color">Кабинет:</span> {infoLesson.cabinet.number}
                </div>
                <div className="time">08:10 - 09:20</div>
              </div>
            )}
          </div>

          <div className="dinner">
            <div className="icon-dinner"></div>
            <div className="title">- Разрываная пара с обедом с 10:50 по 11:10</div>
          </div>
        </div>
      </div>
    </div >
  );
}

const connSheduleDay = connect(mapStatetoProps, actionsCreators)(SheduleDay)
export default connSheduleDay;