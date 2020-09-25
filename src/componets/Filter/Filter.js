import React, { useState } from 'react';
import './filter.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  loadFilterData: actions.loadFilterData,
}

const mapStateToProps = (state) => {
  return { shedule: state.sheduleDay };
}

function Filter(props) {
  const [filterList, setfilterList] = React.useState({});


  const addFilterDiv = (num) => (e) => {
    e.preventDefault();
    setfilterList({ division: num })
  }

  const addFilterCourse = (num) => (e) => {
    e.preventDefault();
    setfilterList({...filterList, course: num});
    const prop = {
      data: props.shedule,
      filter: {...filterList, course: num},
    }

    props.loadFilterData({ prop });
  }

  const divisions = ['СП-1', "СП-2", "СП-3", "СП-4", "СП-5"];
  const courses = [1, 2, 3, 4];

  return (
    <div className="filter col-10">
      <div className="header">
        <div className="switch-head">
          <div className="active-item">Преподаватель</div>
          <div className="passive-item">Студент</div>
        </div>
        <div className="search">
          <label htmlFor="search" className="label-input">Введите группу:</label>
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      <div className="items-list">
        <div className="column">
          {divisions.map(item => {
            let itemClasses = 'item';
            if (item === filterList.division) {
              itemClasses += " active";
            }

            return (
              <div className={itemClasses} key={item} onClick={addFilterDiv(item)}>{item}</div>
            )
          })}
        </div>
        <div className="column">
          {filterList.division && courses.map(item => {
            let itemClasses = 'item';
            if (item === filterList.course) {
              itemClasses += " active";
            }

            return (
              <div className={itemClasses} key={item} onClick={addFilterCourse(item)}>{item} Курс</div>
            )
          })}
        </div>
        <div className="column">

        </div>
      </div>
    </div>
  );
}


const connFilter = connect(mapStateToProps, actionsCreators)(Filter)
export default connFilter;