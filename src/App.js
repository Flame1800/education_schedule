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
  pushPropFromLoadLessons: actions.pushProp,
  loadCurrLessons: actions.loadCurrLessons,
  loadShedule: actions.loadShedule,
}

const mapStatetoProps = (state) => {
  return {
    filter: state.sideBar.filter, sheduleMode: state.sheduleMode.mode, shedule: state.shedule,
    sheduleState: state.sheduleState
  };
}

function App(props) {
  const [startUser, setStartUser] = React.useState(true);

  React.useEffect(() => {
    if (window.localStorage.item && window.localStorage.mode && props.shedule.length > 0 && startUser) {
      const { item, mode } = window.localStorage;

      const prop = {
        data: props.shedule,
        filter: { group: item },
        mode,
      }


      setStartUser(false);
      props.switchFilter();
      props.pushPropFromLoadLessons({ prop });
      props.loadCurrLessons({ prop });
    }
  }, [props.sheduleState]);

  if (props.sheduleState === 'failed') {
    return (
      <div className="App">
        <div className="main-container">
        <div class="no-lessons"> Что то пошло не так... </div>
        </div>
      </div>
    )
  }
  return (
    <div className="App">
      <div className="main-container">
        {!props.filter && <Sidebar />}
        {props.filter ? <Filter /> : (props.sheduleMode === 'week' ? <SheduleWeek /> : <SheduleDay />)}
      </div>
    </div>
  );
}


const ConnectApp = connect(mapStatetoProps, actionsCreators)(App)
export default ConnectApp;
