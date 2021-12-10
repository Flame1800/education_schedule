import React from 'react';
import './sidebar.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
  clearFilter: actions.clearFilter,
  changeMode: actions.changeMode,
  loadCurrLessons: actions.loadCurrLessons,
  changeDateLoad: actions.changeDateLoad
}

const mapStateToProps = (state) => {
  return {
    currLessons: state.currLessons,
    sheduleMode: state.sheduleMode.mode,
    shedule: state.shedule,
    mode: state.sheduleMode.mode,
    loadMode: state.sheduleMode.dataLoadMode,
    propFromLoad: state.propFromLoad,
    dateLoad: state.sheduleMode.dateLoad
  };
}

function Sidebar(props) {

  const openFilter = (e) => {
    e.preventDefault();
    props.clearFilter();
    props.switchFilter();
  }

  let filterClasses = 'btn-filter ';

  if (props.filter) {
    filterClasses += 'btn-active';
  }

  const changeMode = () => (e) => {
    e.preventDefault();
    props.changeMode();
  }

  const changeWeek = (mode) => (e) => {
    e.preventDefault();

    props.changeDateLoad();
    props.loadShedule(mode);
  }

  const currEntity = {
    "student": `${props.currLessons[0].group.name} группа`,
    "teacher": props.currLessons[0].teacher.abb_name,
    "cabinet": props.currLessons[0]?.cabinet?.name
  }

  return (
    <div className="sidebar">
      <div className="main-container">
        <div className={filterClasses} onClick={openFilter}>
          <div className="icon"></div>
          <div className="text">Поиск</div>
        </div>
        <div className="group">{currEntity[props.loadMode]}</div>
        <div className="switch-head" onClick={changeMode()} >
          <div className={props.mode === 'day' ? 'active-item' : 'passive-item'}>День</div>
          <div className={props.mode === 'week' ? 'active-item' : 'passive-item'}>Неделя</div>
        </div>
      </div>
      {/* <div className="weeks-button">
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
      </div> */}
    </div>
  );
}

const connSidebar = connect(mapStateToProps, actionsCreators)(Sidebar)
export default connSidebar;