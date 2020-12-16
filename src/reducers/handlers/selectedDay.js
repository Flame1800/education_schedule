import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import {
    DateTime
} from 'luxon';



export default handleActions({
    [actions.selectDay](state, { payload: { day } }) {
        return day;
    },
    [actions.loadDaysCurrWeek](state, {
        payload: {
            week
        }
    }) {
        const firstDayWeek = week.dateStart;
        const propsDate = DateTime.fromISO(firstDayWeek);
        
        for (let i = 0; i < 6; i++) {
            const date = propsDate.plus({
                days: i
            });

            const localWeekDay = date.toFormat('EEEE');
            const todayWeekDay = DateTime.local().toFormat('EEEE');
            
            if (localWeekDay === todayWeekDay) {
                const fmonth = date.c.month < 10 ? `0${date.c.month}` : date.c.month;
                const fday = date.c.day < 10 ? `0${date.c.day}` : date.c.day;
    
                return `${date.c.year}-${fmonth}-${fday}`;
            }
        }
    },
}, '');