import { combineReducers } from 'redux';

import filter from './handlers/filter'; 
import shedule from './handlers/shedule'; 
import sideBar from './handlers/sideBar';
import currWeek from './handlers/currWeek';
import currLessons from './handlers/currLessons';
import sheduleMode from './handlers/sheduleMode';

export default combineReducers({
    filter,
    shedule,
    sideBar,
    currWeek,
    currLessons,
    sheduleMode
})