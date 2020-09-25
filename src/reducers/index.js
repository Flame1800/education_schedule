import { combineReducers } from 'redux';

import filter from './handlers/filter'; 
import sheduleDay from './handlers/sheduleDay'; 

export default combineReducers({
    filter,
    sheduleDay
})