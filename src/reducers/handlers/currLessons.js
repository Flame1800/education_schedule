import { handleActions } from 'redux-actions';
import * as actions from '../../actions/index';
import _ from 'lodash';

export default handleActions({
    [actions.loadCurrLessons](state, { payload: { prop } }) {
        const { filter, data, mode } = prop;

        if (mode === 'student') {
            const filtered = data.filter((item) => {
                return item.group.name === filter.group;
            }).map(item => {
                return { ...item, exhibitor: item.teacher.abb_name };
            });

            const sortedLessons = _.sortBy(filtered, ['lessonNumber']);
            return sortedLessons;
        }
        if (mode === 'teacher') {
            const filtered = data.filter((item) => {
                return item.teacher.abb_name === filter.group;
            }).map(item => {
                return { ...item, exhibitor: item.group.name };
            });

            const sortedLessons = _.sortBy(filtered, ['lessonNumber']);
            return sortedLessons;
        }
        if (mode === 'cabinet') {
            const filtered = data.filter((item) => {
                if (!item?.cabinet?.name) {
                    return false;
                }

                return item.cabinet.name === filter.group;
            }).map(item => {
                return { ...item, exhibitor: item.cabinet.name, cabinet: item.teacher.abb_name };
            })
            const sortedLessons = _.sortBy(filtered, ['lessonNumber']);
            return sortedLessons;
        }
    }
}, {});

