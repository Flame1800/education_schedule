import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import {DateTime, Duration, Info, Interval, Settings} from 'luxon';
import _ from 'lodash';

export default handleActions({
    [actions.loadCurrLessons](state, {payload: { prop }}) {
        const {filter, data} = prop;

        const filtered = data.filter((item) => {
            return (item.division.abb_name === filter.division 
                && item.group.course === filter.course 
                && item.group.name === filter.group)
        });

        const sortedLessons = _.sortBy(filtered, ['lessonNumber']);
        return sortedLessons;
    }
}, {});