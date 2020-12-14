import React from 'react';
import './sidebar.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
  clearFilter: actions.clearFilter,
  changeMode: actions.changeMode,
}

const mapStateToProps = (state) => {
  return {
    currGroup: state.currLessons[0].group.name,
    currTeacher: state.currLessons[0].teacher.abb_name,
    sheduleMode: state.sheduleMode.mode,
    mode: state.sheduleMode.mode,
    loadMode: state.sheduleMode.dataLoadMode,
  };
}

function Sidebar(props) {

  const [weekMode, setWeekMode] = React.useState('curr');
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

  }


  return (
    <div className="sidebar">
      <div className="main-container">
        <div className={filterClasses} onClick={openFilter}>
          <div className="icon"></div>
          <div className="text">Фильтр</div>
        </div>
        <div className="group">{props.loadMode !== 'teacher' ? props.currGroup + " группа" : props.currTeacher} </div>
        <div className="switch-head" onClick={changeMode()} >
          <div className={props.mode === 'day' ? 'active-item' : 'passive-item'}>День</div>
          <div className={props.mode === 'week' ? 'active-item' : 'passive-item'}>Неделя</div>
        </div>
      </div>
      <div className="weeks-button">
        {weekMode === 'curr' ?
          <div className="btn-w">
            <div className="text" onClick={changeWeek()}>Следующая неделя</div>
            <div className="arrow-right"></div>
          </div>
          :
          <div className="btn-w">
            <div className="arrow-left"></div>
            <div className="text">Текущая неделя</div>
          </div>
        }


      </div>
    </div>
  );
}

const connSidebar = connect(mapStateToProps, actionsCreators)(Sidebar)
export default connSidebar;