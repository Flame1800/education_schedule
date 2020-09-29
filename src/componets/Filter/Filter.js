import React from 'react';
import './filter.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';
import _ from 'lodash';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  loadFilterData: actions.loadFilterData,
  switchFilter: actions.switchFilter,
  loadCurrLessons: actions.loadCurrLessons,
}

const mapStateToProps = (state) => {
  return { groups: state.filter, shedule: state.shedule };
}

function Filter(props) {
  const [filterList, setfilterList] = React.useState({});

  const addFilterDiv = (num) => (e) => {
    e.preventDefault();
    setfilterList({ division: num })
  }

  const addFilterCourse = (num) => (e) => {
    e.preventDefault();
    setfilterList({ ...filterList, course: num });
    const prop = {
      data: props.shedule,
      filter: { ...filterList, course: num },
    }

    props.loadFilterData({ prop });
  }

  const selectLastItem = (num) => (e) => {
    e.preventDefault();
    props.switchFilter();

    setfilterList({ ...filterList, group: num });
    const prop = {
      data: props.shedule,
      filter: { ...filterList, group: num },
    }

    props.loadCurrLessons({ prop });
    
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
        <div className="column groups">
          {props.groups.length === 0 && filterList.course ? "Группы не найдены" : props.groups.map(item => {
            let itemClasses = 'item';
            if (item === filterList.course) {
              itemClasses += " active";
            }

            return (
              <div className={itemClasses} key={_.uniqueId()}  onClick={selectLastItem(item)}>{item}</div>
            )
          })}
        </div>
      </div>
    </div>
  );
}


const connFilter = connect(mapStateToProps, actionsCreators)(Filter)
export default connFilter;