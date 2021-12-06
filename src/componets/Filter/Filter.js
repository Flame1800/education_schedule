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
  pushPropFromLoadLessons: actions.pushProp,
  changeDateLoad: actions.changeDateLoad,
}

const mapStateToProps = (state) => {
  return {
    groups: state.filter,
    shedule: state.shedule,
    mode: state.sheduleMode.dataLoadMode,
    dateLoad: state.sheduleMode.dateLoad,
    dateCurrWeek: state.sideBar.dateCurrWeek,
    sheduleState: state.sheduleState,
  };
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
    console.log(prop)
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

  const selectLastItem = (item, mode = props.mode) => (e) => {
    e.preventDefault();
    props.switchFilter();
    setfilterList({});

    window.localStorage.item = item;
    window.localStorage.mode = mode;

    const prop = {
      data: props.shedule,
      filter: { ...filterList, group: item },
      mode,
    }

    props.pushPropFromLoadLessons({ prop });
    props.loadCurrLessons({ prop });
  }

  const backFilterSelect = () => (e) => {
    e.preventDefault();
    const newFilter = filterList
    delete newFilter.group;
    delete newFilter.course;
    setfilterList({ ...newFilter })
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
    }
  }


  const changeWeek = (mode) => (e) => {
    e.preventDefault();
    props.changeDateLoad();
    props.loadShedule(mode);
  }

  const divisions = ["№1, Маяковского 16/1", "№2, Рабочая 43/1", "№3, Ивана Захарова 12", "№4, Мелик-Карамова 18/1"];
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
            <label htmlFor="search" className="label-input">
              {props.mode === 'student' ? "Введите номер группы:" : "Введите фамилию:"}
            </label>
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
        {props.sheduleState === 'empty' || props.shedule.length === 0 ?
          <div className="no-lessons"> Нет данных </div> :
          <div className="items-list">
            <div className="column">
              {divisions.map(division => {
                let itemClasses = 'item';
                if (division === filterList.division) {
                  itemClasses += " active";
                }

                return (
                  <div className={itemClasses} key={division}
                    onClick={addFilterDiv(division)}>{division}</div>
                )
              })}
            </div>
            <div className="column">
              {filterList.division && props.mode === 'student'
                && filterList.division !== 'СП-1'
                && courses.map(item => {
                  let itemClasses = 'item';
                  if (item === filterList.course) {
                    itemClasses += " active";
                  }

                  return (
                    <div className={itemClasses} key={item} onClick={addFilterCourse(item)}>{item} Курс</div>
                  )
                })}
            </div>
            {Object.keys(filterList).length > 1 && props.mode === 'student' &&
              <div className="column groups">
                <div className="arrow-left" onClick={backFilterSelect()}></div>
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
        }



        <div className="block-info">
          {props.sheduleState === 'ready' && <div className='info'>Расписание занятий на {props.dateCurrWeek}</div>}
          <div className="weeks-button">
            {props.dateLoad === 'curr' ?
              <div className="btn-w" onClick={changeWeek('next')}>
                <div className="text">Следующая неделя</div>
                <div className="arrow-right-sidebar"></div>
              </div>
              :
              <div className="btn-w" onClick={changeWeek('curr')}>
                <div className="arrow-left-sidebar"></div>
                <div className="text">Текущая неделя</div>
              </div>
            }
          </div>
        </div>

        <div className="copyright">
        © 2021 HelloPeople, Ruslan Shaficov 
        </div>
      </div>
    </div>
  );
}


const connFilter = connect(mapStateToProps, actionsCreators)(Filter)
export default connFilter;