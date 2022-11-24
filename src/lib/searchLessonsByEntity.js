export default (lessons, value = '', entity) => {
    return lessons.filter(lesson => lesson[entity].name)
        .toLocaleLowerCase()
        .startsWith(value.toLocaleLowerCase())
}