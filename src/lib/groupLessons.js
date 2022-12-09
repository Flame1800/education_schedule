import _ from "lodash";

export default (lessons, groupValue) => {
    const groupLessons = _.groupBy(lessons, groupValue)
    return Object.entries(groupLessons)
}