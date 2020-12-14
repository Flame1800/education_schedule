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
  changeMode: actions.changeDataLoadMode,
  clearFilter: actions.clearFilter,
}

const mapStateToProps = (state) => {
  return { groups: state.filter, shedule: state.shedule, mode: state.sheduleMode.dataLoadMode };
}

function Filter(props) {
  const [filterList, setfilterList] = React.useState({});
  const [searchResults, setSearchResults] = React.useState({});
  const [searchValue, setSearchValue] = React.useState({});

  const changeMode = () => (e) => {
    e.preventDefault();
    props.changeMode();
    props.clearFilter();
    setfilterList({});
  }

  const addFilterCourse = (num) => (e) => {
    e.preventDefault();

    setfilterList({ ...filterList, course: num });
    const prop = {
      data: props.shedule,
      filter: { ...filterList, course: num },
      mode: props.mode
    }

    props.loadFilterData({ prop });
  }

  const addFilterDiv = (num) => (e) => {
    e.preventDefault();
    setfilterList({ division: num });
    if (props.mode === 'teacher') {
      const prop = {
        data: props.shedule,
        filter: { ...filterList },
        mode: props.mode,
        division: num,
      }

      props.loadFilterData({ prop });
    }
  }

  const selectLastItem = (num) => (e) => {
    e.preventDefault();
    props.switchFilter();
    setfilterList({});

    const prop = {
      data: props.shedule,
      filter: { ...filterList, group: num },
      mode: props.mode,
    }

    props.loadCurrLessons({ prop });
  }

  const search = () => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      let res;

      if (props.mode === 'student') {
        res = props.shedule.filter(item => {
          return item.group.name.startsWith(value);
        }).map(item => item.group.name);
      }
      if (props.mode === 'teacher') {
        res = props.shedule.filter(item => {
          return item.teacher.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase());
        }).map(item => item.teacher.abb_name);
      }

      function compareNumeric(a, b) {
        if (a > b) return 1;
        if (a === b) return 0;
        if (a < b) return -1;
      }

      res.sort(compareNumeric);
      const newData = _.sortedUniq(res);
      setSearchResults(newData);

      document.addEventListener('keydown', (e => {
        if (e.code === "Enter") {
          selectLastItem(newData[0]);
        }
      }))
    }
  }

  const divisions = ['СП-1', "СП-2", "СП-3", "СП-4", "СП-5"];
  const courses = [1, 2, 3, 4];
  return (
    <div className="shadow-container">
      <div className="filter">
        <div className="header">
          <div className="switch-head" onClick={changeMode()}>
            <div className={props.mode === 'teacher' ? 'active-item' : 'passive-item'}>Преподаватель</div>
            <div className={props.mode === 'student' ? 'active-item' : 'passive-item'}>Студент</div>
          </div>
          <div className="search">
            <label htmlFor="search" className="label-input">{props.mode === 'student' ? "Введите номер группы:" : "Введите фамилию:"}</label>
            <div className="search-cont">
              <input type="text" placeholder="Поиск" onInput={search()} />
              {searchValue.length > 0 && <div className="search-results">{
                searchResults.map(item => {
                  return (<div key={item} onClick={selectLastItem(item)} className='item'>{item}</div>);
                })
              }</div>}
            </div>
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
                <div className={itemClasses} key={item}
                  onClick={addFilterDiv(item)}>{item}</div>
              )
            })}
          </div>
          <div className="column">
            {filterList.division && props.mode === 'student' && courses.map(item => {
              let itemClasses = 'item';
              if (item === filterList.course) {
                itemClasses += " active";
              }

              return (
                <div className={itemClasses} onClick={selectLastItem(item)} key={item} onClick={addFilterCourse(item)}>{item} Курс</div>
              )
            })}
          </div>
          {Object.keys(filterList).length > 1 && props.mode === 'student' &&
            <div className="column groups">
              {props.groups.length === 0 && filterList.course ? "Группы не найдены" : props.groups.map(item => {
                let itemClasses = 'item';
                if (item === filterList.course) {
                  itemClasses += " active";
                }

                return (
                  <div className={itemClasses} key={_.uniqueId()} onClick={selectLastItem(item)}>{item}</div>
                )
              })}
            </div>}
          {props.mode === 'teacher' &&
            <div className="column teacher-groups">
              {props.groups.length === 0 && filterList.division ? "Преподаватели не найдены" : props.groups.map(item => {
                let itemClasses = 'item item-teacher';
                if (item === filterList.course) {
                  itemClasses += " active";
                }

                return (
                  <div className={itemClasses} key={_.uniqueId()} onClick={selectLastItem(item)}>{item}</div>
                )
              })}
            </div>}
        </div>
      </div>
    </div>
  );
}


const connFilter = connect(mapStateToProps, actionsCreators)(Filter)
export default connFilter;