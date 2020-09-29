import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import {DateTime, Duration, Info, Interval, Settings} from 'luxon';
import _ from 'lodash';

export default handleActions({
    [actions.loadCurrLessons](state, {payload: { prop }}) {
        const {filter, data} = prop;
        let {year, month, day} = DateTime.local();
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        const currDate = `${year}-${month}-${day}`;

        const filtered = data.filter((item) => {
            return (item.division.abb_name === filter.division 
                && item.group.course === filter.course 
                && item.group.name === filter.group
                && item.date === currDate)
        });

        const sortedLessons = _.sortBy(filtered, ['lessonNumber']);
        return sortedLessons;
    }
}, {});