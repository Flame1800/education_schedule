export default (lessons, day) => {
    return lessons.filter(lesson => lesson.date === day)
}