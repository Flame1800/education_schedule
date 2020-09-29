import React from 'react';
import './navWeek.scss';
import { connect } from "react-redux";
import { DateTime, Duration, Info, Interval, Settings } from 'luxon';

const actionsCreators = {

}

const mapStatetoProps = (state) => {
  return { days: state.currWeek };
}

function NavWeek(props) {

  return (
    <div className="nav-week d-flex">

      {props.days.map(day => {
        let classes = 'item';

        if (day.active) {
          classes += ' item-active';
        }

        return (
          <div className={classes} key={day.day}>
            <div className="num">{day.day}</div>
            <div className="day">{day.weekDay}</div>
          </div>
        )
      })}
    </div>
  );
}


const connNavWeek = connect(mapStatetoProps, actionsCreators)(NavWeek)
export default connNavWeek;