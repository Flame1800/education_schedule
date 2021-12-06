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
        const groupsNosorted = filtered.map(item => mode === 'teacher' ? item.teacher.abb_name : item.group.name);

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