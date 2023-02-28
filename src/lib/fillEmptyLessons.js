import _ from "lodash";

export default (dayLessons) => {

    const newLessons = [];
    const findLesson = (num, lessons) => {
        const currLessons = lessons.filter(lesson => lesson.lessonNumber === num);

        if (currLessons.length === 1) {
            return currLessons[0];
        }
        if (currLessons.length > 1) {
            return currLessons;
        }

        return {subject: {name: "Нет пары"}, lessonNumber: num, _id: _.uniqueId()};
    }

    for (let i = 1; i <= 6; i++) {
        newLessons.push(findLesson(i, dayLessons));
    }

    return newLessons;
}