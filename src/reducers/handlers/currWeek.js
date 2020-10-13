import {
    DateTime
} from 'luxon';
import {
    handleActions
} from 'redux-actions';
import * as actions from '../../actions/index';

export default handleActions({
    [actions.loadDaysCurrWeek](state, {
        payload: {
            week
        }
    }) {
        const days = [];

        const firstDayWeek = week.dateStart;
        const propsDate = DateTime.fromISO(firstDayWeek).setLocale('ru');
        const currDay = DateTime.local().day;

        for (let i = 0; i < 6; i++) {
            const date = propsDate.plus({
                days: i
            });
            const day = date.c.day;
            const month = date.toFormat('MMMM');
            const weekDay = date.toFormat('EEEE').split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
            

            const fyear = date.c.year;
            const fmonth = date.c.month < 10 ? `0${date.c.month}` : date.c.month;
            const fday = date.c.day < 10 ? `0${date.c.day}` : date.c.day;

            const fullDate = `${fyear}-${fmonth}-${fday}`;

            const res = {
                day: `${day} ${month}`,
                weekDay,
                active: day === currDay,
                fullDate,
            };
            days.push(res);
        }

        return days;
    },
}, []);