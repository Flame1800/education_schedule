import React from 'react';
import './sidebar.scss';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
}

const mapStateToProps = (state) => {
  return { currGroup: state.currLessons[0].group.name};
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

  
  return (

      <div className="sidebar">
            <div className={filterClasses} onClick={openFilter}>
              <div className="icon"></div>
              <div className="text">Фильтр</div>
            </div>
            <div className="group">{props.currGroup} группа</div>
      </div>
  );
}

const connSidebar = connect(mapStateToProps, actionsCreators)(Sidebar)
export default connSidebar;