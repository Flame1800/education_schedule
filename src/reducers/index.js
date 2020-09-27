import { combineReducers } from 'redux';

import filter from './handlers/filter'; 
import shedule from './handlers/shedule'; 
import sideBar from './handlers/sideBar';

export default combineReducers({
    filter,
    shedule,
    sideBar
})