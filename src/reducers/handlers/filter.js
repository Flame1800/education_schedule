import {
    handleActions
} from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.loadFilterData](state, {
        payload: { prop }
    }) {
        const { filter, data } = prop;

        const filtered = data.filter((item) => {
            return (item.division.abb_name === filter.division && item.group.course === filter.course)
        });
        const groupsnNosorted = filtered.map(item => item.group.name);

        function compareNumeric(a, b) {
            if (a > b) return 1;
            if (a === b) return 0;
            if (a < b) return -1;
        }

        groupsnNosorted.sort(compareNumeric);
        const groups = _.sortedUniq(groupsnNosorted);

        return groups;
    },
    [actions.clearFilter]() {
        return [];
    }
}, []);