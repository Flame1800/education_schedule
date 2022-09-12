export default (lesson) => {
    if (lesson.subject) {
        return lesson.subject.name || lesson.subject.abb_name
    }

    return ''
}
