import _ from "lodash";

export default (lessons) => {
    return _.sortBy(lessons, "group.name")
}