import {
    handleActions
} from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
<<<<<<< HEAD
    [actions.loadFilterData](state, { payload: { prop } }) {
        const { filter, data, mode } = prop;

=======
    [actions.loadFilterData](state, {payload: { prop }}) {
        const {filter, data} = prop;
>>>>>>> 46869048628eb6f75138090767aea2cda16916c9
        const filtered = data.filter((item) => {
            if (mode === 'student') {
                return (item.division.abb_name === filter.division && item.group.course === filter.course)
            }
            return (item.division.abb_name === prop.division)
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