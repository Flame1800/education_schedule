import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import {
    DateTime
} from 'luxon';



export default handleActions({
    [actions.selectDay](state, { payload: { day } }) {
        return day;
    },
    [actions.loadDaysCurrWeek]() {
        const date = DateTime.local();

        const fyear = date.c.year;
        const fmonth = date.c.month < 10 ? `0${date.c.month}` : date.c.month;
        const fday = date.c.day < 10 ? `0${date.c.day}` : date.c.day;

        return `${fyear}-${fmonth}-${fday}`;
    }

}, '');