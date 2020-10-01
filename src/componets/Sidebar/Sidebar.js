import React, { useState } from 'react';
import './sidebar.scss';
import SheduleDay from '../SheduleDay';
import SheduleWeek from '../SheduleWeek';
import Filter from '../Filter';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
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
              <div className="text"  >Фильтр</div>
            </div>
      
      </div>
  );
}

const connSidebar = connect(null, actionsCreators)(Sidebar)
export default connSidebar;