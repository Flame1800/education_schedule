import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.loadFilterData](state, {payload: { prop }}) {
        const {filter, data} = prop;
        
        const filtered = data.filter((item) => {
            return (item.division.abb_name === filter.division && item.group.course === filter.course)
        });
        const groups = _.sortedUniq(filtered.map(item => item.group.name));

        return groups;
    }, 
    [actions.clearFilter]() {
        return [];
    }
}, []);