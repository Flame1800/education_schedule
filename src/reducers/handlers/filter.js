import {
    handleActions
} from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.loadFilterData](state, { payload: { prop } }) {
        const { filter, data, mode } = prop;

        const filtered = data.filter((item) => {
            if (mode === 'student') {
                return (item.division.name === filter.division && item.group.course === filter.course)
            }
            return (item.division.name === prop.division)
        });
        const groupsNosorted = filtered.map(item => {
            if (mode === 'teacher') {
                return item.teacher.abb_name
            }
            if (mode === 'cabinet' && item.cabinet) {
                return item.cabinet.name
            }
            if (mode === 'student') {
                return item.group.name
            }

            return null
        }).filter(item => item);

        function compareNumeric(a, b) {
            if (a > b) return 1;
            if (a === b) return 0;
            if (a < b) return -1;
        }

        groupsNosorted.sort(compareNumeric);
        const newData = _.sortedUniq(groupsNosorted);

        return newData;

    },
    [actions.clearFilter]() {
        return [];
    }
}, []);