import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.loadFilterData](state, {payload: { prop }}) {
        const {filter, data} = prop;

        const filtered = data.filter((item) => {
            return (item.division.abb_name === filter.division && item.group.course === 1)
        });

        console.log(filtered);
        filtered.forEach(item => console.log(item.division.abb_name));
        // const newList = _.sortedUniq(list);
        // console.log(newList);

        // const filterList = { list }

        return '';
    }, 
}, {});