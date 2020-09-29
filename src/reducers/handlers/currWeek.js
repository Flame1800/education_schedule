import {DateTime, Duration, Info, Interval, Settings} from 'luxon';
import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.loadDaysCurrWeek](state, {payload: { week }}) {
        const days = [];

        const firstDayWeek = week.dateStart;
        const propsDate = DateTime.fromISO(firstDayWeek).setLocale('ru');
        const currDay = DateTime.local().day;

        for (let i = 0; i < 6; i++) {
            const date = propsDate.plus({days: i})
            const day = date.c.day;
            const month = date.toFormat('MMMM');
            const weekDay =date.toFormat('EEE');
            const res = {day: `${day} ${month}`, weekDay, active: day === currDay };
            days.push(res);
        }

        return days;
    }, 
}, []);