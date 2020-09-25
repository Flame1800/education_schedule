import React, { useState } from 'react';
import './sidebar.scss';
import SheduleDay from '../SheduleDay';
import SheduleWeek from '../SheduleWeek';
import Filter from '../Filter';
import { connect } from "react-redux";
import * as actions from '../../actions';

const actionsCreators = {
  loadShedule: actions.loadShedule
}

function Sidebar(props) {
  const [filter, setFilter] = useState(false);
  const [mode, setMode] = useState('day');

  const changeSheduleMode = (e) => {
    // e.preventDefault();
    const newMode = mode === 'day' ? 'week' : 'day'
    setMode(newMode);
  }

  const openFilter = (e) => {
    e.preventDefault();
    setFilter(!filter);
    
    if (!filter) {
      props.loadShedule();
    }
  }

  let filterClasses = 'btn-filter ';

  if (filter) {
    filterClasses += 'btn-active';
  }

  return (
    <div className="shedule mt-3 p-0 d-flex">
      <div className="sidebar col-2 p-0">
        <div className="logo">РАСПИСАНИЕ</div>
        <div className="side-container">
          <div className="head-items">
            <div className="info-text">
              712 ГРУППА
            </div>
            <div className={filterClasses} onClick={openFilter}>
              <div className="icon"></div>
              <div className="text"  >Фильтр</div>
            </div>
            <div className="switch-week">
              <div className="title">Вся неделя</div>
              <label className="label" onChange={changeSheduleMode}>
                <div className="toggle">
                  <input className="toggle-state" type="checkbox" name="check" value="check" />
                  <div className="toggle-inner">
                    <div className="indicator"></div>
                  </div>
                  <div className="active-bg"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="date-info">
          <div className="data">31.08.2020</div>
          <div className="day">Воскресение</div>
          <div className="time">16:06</div>
        </div>
      </div>
      {filter ? <Filter /> : (mode === 'day' ? <SheduleDay /> : <SheduleWeek />)}
    </div>
  );
}

const connSidebar = connect(null, actionsCreators)(Sidebar)
export default connSidebar;