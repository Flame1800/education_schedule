import React from 'react';
import './nawWeek.scss';
import { connect } from "react-redux";
import * as actions from '../../actions/index';

const actionsCreators = {
  selectDay: actions.selectDay,
}

const mapStatetoProps = (state) => {
  return { days: state.currWeek, currDay: state.selectedDay };
}

function NavWeek(props) {

  const selectDayHadle = (day) => (e) => {
    e.preventDefault();
    props.selectDay({ day });
  }
  
  return (
    <div className="nav-week d-flex">

      {props.days.map(day => {
        let classes = 'item';

        if (props.currDay === day.fullDate) {
          classes += ' item-active';
        }

        return (
          <div className={classes} key={day.day} onClick={selectDayHadle(day.fullDate)}>
            <div className="num">{day.day}</div>
            <div className="day">{day.littleWeekDay}</div>
          </div>
        )
      })}
    </div>
  );
}


const connNavWeek = connect(mapStatetoProps, actionsCreators)(NavWeek)
export default connNavWeek;