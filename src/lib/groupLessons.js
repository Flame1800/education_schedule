import _ from "lodash";
import datesStore from "../store/datesStore";

export default (lessons, groupField) => {
    const lessonsToday = _.sortBy(lessons.filter(lesson => lesson.date === datesStore.currDay), groupField)
    const groupLessons = _.groupBy(lessonsToday, groupField)

    return Object.entries(groupLessons)
}