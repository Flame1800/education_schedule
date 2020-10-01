import React from 'react';
import './app.scss';
import Filter from './componets/Filter';
import Sidebar from './componets/Sidebar';
import SheduleDay from './componets/SheduleDay';
import SheduleWeek from './componets/SheduleWeek';
import { connect } from "react-redux";
import * as actions from './actions';

const actionsCreators = {
  loadShedule: actions.loadShedule,
  switchFilter: actions.switchFilter,
}

const mapStatetoProps = (state) => {
  return { filter: state.sideBar.filter }
} 

function App(props) {
  const [mode, setMode] = React.useState('day');

  const changeSheduleMode = () => {
    const newMode = mode === 'day' ? 'week' : 'day'
    setMode(newMode);
  }

  return (
    <div className="App">
      <div className="main-container">
        {!props.filter && <Sidebar />}
        {props.filter ? <Filter /> : (mode === 'day' ? <SheduleWeek /> : <SheduleDay />)}
      </div>
    </div>
  );
}


const ConnectApp = connect(mapStatetoProps, actionsCreators)(App)
export default ConnectApp;
