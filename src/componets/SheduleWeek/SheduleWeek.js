import React from 'react';
import './sheduleWeek.scss';
import { connect } from "react-redux";

const mapStatetoProps = (state) => {
  return { days: state.currWeek, lessons: state.currLessons };
}


function SheduleWeek(props) {


  console.log(props.lessons)

  return (
    <div className="shedule-week col-10 p-0">
      {props.days.map(day => {
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
              <div className="item">
                <div className="couple">
                  <div className="head-card">
                    <div className="name">Учебная практика .02</div>
                  </div>
                  <div className="cont">
                    <div className="teacher">
                      <div className="icon"></div>
                      Панасеня В.В
                    </div>
                    <div className="min-cont">
                      <div className="cab">
                        <div className="flag-icon"></div>
                      23
                    </div>
                      <div className="time">
                        00:00
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="couple">
                  <div className="head-card">
                    <div className="name">Учебная практика .02</div>
                  </div>
                  <div className="cont">
                    <div className="teacher">
                      <div className="icon"></div>
                      Панасеня В.В
                    </div>
                    <div className="min-cont">
                      <div className="cab">
                        <div className="flag-icon"></div>
                      23
                    </div>
                      <div className="time">
                        00:00
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="couple">
                  <div className="headers">
                    <div className="head-card">
                      <div className="name">Учебная практика .02</div>
                      <div className="teacher">
                        <div className="icon"></div>
                      Панасеня В.В
                    </div>
                    </div>
                    <div className="head-card">
                      <div className="name">Учебная практика .02</div>
                      <div className="teacher">
                        <div className="icon"></div>
                      Панасеня В.В
                    </div>
                    </div>
                  </div>
                  <div className="cont">

                    <div className="cab">
                      <div className="flag-icon"></div>
                      23
                    </div>
                    <div className="time">
                      00:00
                    </div>
                    <div className="cab">
                      <div className="flag-icon"></div>
                      23
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

    </div >
  );
}

const connSheduleWeek = connect(mapStatetoProps, null)(SheduleWeek)
export default connSheduleWeek;