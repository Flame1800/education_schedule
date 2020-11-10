import React from 'react';
import './sidebar.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
  changeMode: actions.changeMode,
}

const mapStateToProps = (state) => {
  return {
    currGroup: state.currLessons[0].group.name,
    sheduleMode: state.sheduleMode.mode,
  };
}

function Sidebar(props) {
  const openFilter = (e) => {
    e.preventDefault();
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


  return (

    <div className="sidebar">
      <div className="main-container">
        <div className={filterClasses} onClick={openFilter}>
          <div className="icon"></div>
          <div className="text">Фильтр</div>
        </div>
        <div className="group">{props.currGroup} группа</div>
        <div className="mode-container">
          <div className="title">Вид</div>
          <div className="mode-button" onClick={changeMode()}>
            {props.sheduleMode === 'week' ? "День" : "Неделя"}
          </div>
        </div>
      </div>
      <div className="weeks-button">
        <div className="btn-w">
          <div className="arrow-left"></div>
          <div className="text">Пред. неделя</div>
        </div>
        <div className="btn-w">
          <div className="text">След. неделя</div>
          <div className="arrow-right"></div>
        </div>
      </div>
    </div>
  );
}

const connSidebar = connect(mapStateToProps, actionsCreators)(Sidebar)
export default connSidebar;